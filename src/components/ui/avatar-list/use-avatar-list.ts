import { type KeyboardEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { AvatarAnimationProps } from "./avatar-list.types";

export const AVATAR_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
/** Pins, names and the count leave fast so they don't cover the avatars */
const FAST_FADE = 120;
/** Rows after this one land together, so long lists don't drag */
const STAGGER_LIMIT = 12;

interface Snapshot {
	element: HTMLElement;
	rect: DOMRect;
	opacity: string;
	pin: boolean;
	/** Not cut off by the scroll box or hidden under its sticky header */
	whole: boolean;
}

/** Everything marked with data-animate, keyed by its value */
function measure(container: HTMLElement) {
	const snapshots = new Map<string, Snapshot>();
	for (const element of container.querySelectorAll<HTMLElement>(
		"[data-animate]",
	)) {
		const rect = element.getBoundingClientRect();
		const pin = element.hasAttribute("data-animate-pin");
		const scroll = element.closest("[data-animate-scroll]");
		let whole = true;
		if (scroll && !pin) {
			const view = scroll.getBoundingClientRect();
			const top =
				scroll.querySelector(".avatar-list-header")?.getBoundingClientRect()
					.bottom ?? view.top;
			// rows scrolled out of view stay out of the animation
			if (
				rect.bottom <= top ||
				rect.top >= view.bottom ||
				rect.right <= view.left ||
				rect.left >= view.right
			) {
				continue;
			}
			whole =
				rect.top >= top &&
				rect.bottom <= view.bottom &&
				rect.left >= view.left &&
				rect.right <= view.right;
		}
		snapshots.set(element.dataset.animate as string, {
			element,
			rect,
			opacity: getComputedStyle(element).opacity,
			pin,
			whole,
		});
	}
	return snapshots;
}

/** Lets the expanded list scroll before it runs off the bottom of the screen */
function fitToScreen(container: HTMLElement | null) {
	const scroll = container?.querySelector<HTMLElement>("[data-animate-scroll]");
	scroll?.style.setProperty(
		"--avatar-list-top",
		`${scroll.getBoundingClientRect().top}px`,
	);
}

/** A transform that puts an element laid out at `to` over `from` */
function placeAt(from: DOMRect, to: DOMRect) {
	const x = from.left - to.left;
	const y = from.top - to.top;
	return `translate(${x}px, ${y}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

/**
 * Where hidden avatars come from and go to: the "+N" chip, or else the last
 * avatar still shown, so they never leave the box
 */
function hiddenAvatarSpot(snapshots: Map<string, Snapshot>) {
	const chip = snapshots.get("overflow");
	if (chip) return chip;
	let spot: Snapshot | undefined;
	let highest = -1;
	for (const [key, snapshot] of snapshots) {
		const index = Number(key.match(/^avatar-(\d+)$/)?.[1] ?? -1);
		if (index > highest) {
			highest = index;
			spot = snapshot;
		}
	}
	return spot;
}

/** How far the box corner nearest to the element moves from home to other */
function cornerOffset(rect: DOMRect, home: DOMRect, other: DOMRect) {
	const right = rect.left + rect.width / 2 > home.left + home.width / 2;
	const bottom = rect.top + rect.height / 2 > home.top + home.height / 2;
	const x = right ? other.right - home.right : other.left - home.left;
	const y = bottom ? other.bottom - home.bottom : other.top - home.top;
	return `${x}px ${y}px`;
}

/**
 * A copy of a removed element, so it can fade out where it was.
 * It ignores the pointer, so it never blocks the live elements.
 */
function createGhost(snapshot: Snapshot, container: HTMLElement) {
	const ghost = snapshot.element.cloneNode(true) as HTMLElement;
	// nested animated elements move on their own
	for (const nested of ghost.querySelectorAll("[data-animate]"))
		nested.remove();
	for (const image of ghost.querySelectorAll("img")) image.decoding = "sync";
	ghost.removeAttribute("data-animate");
	ghost.setAttribute("data-animate-ghost", "");
	ghost.setAttribute("aria-hidden", "true");

	const origin = container.getBoundingClientRect();
	Object.assign(ghost.style, {
		position: "absolute",
		left: `${snapshot.rect.left - origin.left}px`,
		top: `${snapshot.rect.top - origin.top}px`,
		width: `${snapshot.rect.width}px`,
		height: `${snapshot.rect.height}px`,
		margin: "0",
		transform: "none",
		pointerEvents: "none",
	});
	container.append(ghost);
	return ghost;
}

interface UseAvatarListOptions extends Required<AvatarAnimationProps> {
	avatarCount: number;
}

export function useAvatarList({
	avatarCount,
	duration,
	nameDelay,
	stagger,
}: UseAvatarListOptions) {
	const [expanded, setExpanded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const running = useRef<Animation[]>([]);

	const toggle = () => {
		const expanding = !expanded;
		const container = containerRef.current;
		const box = boxRef.current;
		const update = () => {
			flushSync(() => setExpanded(expanding));
			fitToScreen(container);
			// the clicked button is gone, so move focus to its counterpart
			(expanding ? closeRef : triggerRef).current?.focus();
		};

		const stop = () => {
			for (const animation of running.current) animation.cancel();
			running.current = [];
			for (const ghost of container?.querySelectorAll("[data-animate-ghost]") ??
				[]) {
				ghost.remove();
			}
		};

		if (
			!container ||
			!box ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			stop();
			update();
			return;
		}

		// First: where everything is on screen now, mid-animation included
		const first = measure(container);
		const boxFirst = box.getBoundingClientRect();
		const radiusFirst = getComputedStyle(box).borderTopLeftRadius;

		stop();
		update();

		// Last: the new layout, without any animation applied
		const last = measure(container);
		const boxLast = box.getBoundingClientRect();
		const radiusLast = getComputedStyle(box).borderTopLeftRadius;
		// the box lasts as long as the slowest avatar so none escape it
		const boxDuration =
			duration + Math.min(avatarCount - 1, STAGGER_LIMIT) * stagger;

		const play = (
			element: Element,
			keyframes: Keyframe[],
			options: KeyframeAnimationOptions,
		) => {
			const animation = element.animate(keyframes, {
				easing: AVATAR_EASE,
				// backwards covers the delay; once done, the element's own styles apply
				fill: "backwards",
				...options,
			});
			running.current.push(animation);
			return animation;
		};

		const itemDuration = (key: string) => {
			const index = key.match(/^(?:avatar|name)-(\d+)$/)?.[1];
			return index === undefined
				? duration
				: duration + Math.min(Number(index), STAGGER_LIMIT) * stagger;
		};

		// The box sits at inset 0, so grow it from where it was
		play(
			box,
			[
				{
					left: `${boxFirst.left - boxLast.left}px`,
					top: `${boxFirst.top - boxLast.top}px`,
					width: `${boxFirst.width}px`,
					height: `${boxFirst.height}px`,
					borderRadius: radiusFirst,
				},
				{
					left: "0px",
					top: "0px",
					width: `${boxLast.width}px`,
					height: `${boxLast.height}px`,
					borderRadius: radiusLast,
				},
			],
			{ duration: boxDuration },
		);

		// The scroll box can't clip its rows to the growing box, so clip it too
		const scroll = container.querySelector<HTMLElement>(
			"[data-animate-scroll]",
		);
		if (scroll) {
			const view = scroll.getBoundingClientRect();
			const inset = [
				boxFirst.top - view.top,
				view.right - boxFirst.right,
				view.bottom - boxFirst.bottom,
				boxFirst.left - view.left,
			].map((side) => `${Math.max(0, side)}px`);
			play(
				scroll,
				[
					{ clipPath: `inset(${inset.join(" ")} round ${radiusFirst})` },
					{ clipPath: `inset(0px round ${radiusLast})` },
				],
				{ duration: boxDuration },
			);
		}

		for (const [key, now] of last) {
			const before = first.get(key);

			// Moved: start at the old rect, then slide and scale into place
			if (before) {
				play(
					now.element,
					[
						{
							transformOrigin: "0 0",
							transform: placeAt(before.rect, now.rect),
							opacity: before.opacity,
						},
						{ transformOrigin: "0 0", transform: "none", opacity: 1 },
					],
					{ duration: itemDuration(key) },
				);
				continue;
			}

			// Entering
			const spot = hiddenAvatarSpot(first);
			if (spot && key.startsWith("avatar-")) {
				play(
					now.element,
					[
						{
							transformOrigin: "0 0",
							transform: placeAt(spot.rect, now.rect),
							opacity: 0,
						},
						{ transformOrigin: "0 0", transform: "none", opacity: 1 },
					],
					{ duration: itemDuration(key) },
				);
			} else if (key === "count") {
				// comes back only after everything settled
				play(now.element, [{ opacity: 0 }, { opacity: 1 }], {
					delay: boxDuration,
					duration: 300,
					easing: "ease-in-out",
				});
			} else if (now.pin) {
				// rides its corner of the growing box while it fades in
				play(
					now.element,
					[
						{ translate: cornerOffset(now.rect, boxLast, boxFirst) },
						{ translate: "0px 0px" },
					],
					{ duration: boxDuration },
				);
				play(now.element, [{ opacity: 0 }, { opacity: 1 }], { duration });
			} else if (key.startsWith("name-")) {
				const index = Math.min(
					Number(key.slice("name-".length)),
					STAGGER_LIMIT,
				);
				play(
					now.element,
					[
						{ opacity: 0, translate: "-6px 0", filter: "blur(2px)" },
						{ opacity: 1, translate: "0 0", filter: "blur(0)" },
					],
					{
						delay: (index + 1) * nameDelay,
						duration: itemDuration(key),
					},
				);
			} else {
				play(now.element, [{ opacity: 0 }, { opacity: 1 }], {
					duration: itemDuration(key),
				});
			}
		}

		// Leaving: React already removed them, so fade a copy where they were
		for (const [key, before] of first) {
			// a copy of a half hidden row would show in full, so it just goes
			if (last.has(key) || !before.whole) continue;

			const ghost = createGhost(before, container);
			const fast = before.pin || key === "count" || key.startsWith("name-");
			const fade = play(ghost, [{ opacity: before.opacity }, { opacity: 0 }], {
				duration: fast ? FAST_FADE : itemDuration(key),
				fill: "forwards",
			});
			const spot = hiddenAvatarSpot(last);
			if (spot && key.startsWith("avatar-")) {
				play(
					ghost,
					[
						{ transformOrigin: "0 0", transform: "none" },
						{
							transformOrigin: "0 0",
							transform: placeAt(spot.rect, before.rect),
						},
					],
					{ duration: itemDuration(key), fill: "forwards" },
				);
			}
			if (before.pin) {
				// rides its corner of the shrinking box
				play(
					ghost,
					[
						{ translate: "0px 0px" },
						{ translate: cornerOffset(before.rect, boxFirst, boxLast) },
					],
					{ duration: boxDuration, fill: "forwards" },
				);
			}
			fade.finished.then(() => ghost.remove()).catch(() => {});
		}
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (expanded && event.key === "Escape") toggle();
	};

	return {
		boxRef,
		closeRef,
		containerRef,
		expanded,
		onKeyDown,
		toggle,
		triggerRef,
	};
}
