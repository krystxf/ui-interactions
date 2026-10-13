import { X } from "lucide-react";
import type { HTMLAttributes, ReactNode, RefObject } from "react";
import { cn } from "@/lib/utils";

interface AvatarListBoxProps {
	boxRef: RefObject<HTMLDivElement | null>;
	containerRef: RefObject<HTMLDivElement | null>;
	expanded: boolean;
	radius: number;
	className?: string;
	children: ReactNode;
}

/**
 * The list keeps its final size right away. The background sits on its own
 * layer, so it can grow from the old size without stretching the content.
 */
export function AvatarListBox({
	boxRef,
	containerRef,
	expanded,
	radius,
	className,
	children,
}: AvatarListBoxProps) {
	return (
		<div
			className={cn("avatar-list relative isolate w-fit", className)}
			data-expanded={expanded}
			ref={containerRef}
			style={{ borderRadius: radius }}
		>
			<div
				className="absolute inset-0 -z-10 border border-(--avatar-list-border) bg-(--avatar-list-bg)"
				ref={boxRef}
				style={{ borderRadius: radius }}
			/>
			{children}
		</div>
	);
}

/**
 * The expanded list. It scrolls as a whole, so avatars that fly in from the
 * collapsed list are never cut off. The header sticks to its top.
 */
export function AvatarListScroll({
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<section
			{...props}
			className={cn("avatar-list-scroll flex flex-col gap-2", className)}
			data-animate-scroll=""
			// the header gets a background only once rows slide under it
			onScroll={(event) =>
				event.currentTarget.toggleAttribute(
					"data-scrolled",
					event.currentTarget.scrollTop > 0,
				)
			}
		/>
	);
}

interface AvatarListHeaderProps {
	title: string;
	closeRef: RefObject<HTMLButtonElement | null>;
	onClose: () => void;
	className?: string;
}

export function AvatarListHeader({
	title,
	closeRef,
	onClose,
	className,
}: AvatarListHeaderProps) {
	return (
		<span
			className={cn(
				"avatar-list-header sticky top-0 z-10 flex items-center justify-between gap-6",
				className,
			)}
		>
			<span
				className="font-medium text-base text-gray-500"
				data-animate="heading"
				data-animate-pin=""
			>
				{title}
			</span>
			<button
				aria-label={`Close ${title}`}
				className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 outline-none transition-colors hover:bg-black/5 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-300 active:bg-black/10"
				data-animate="close"
				data-animate-pin=""
				onClick={onClose}
				ref={closeRef}
				type="button"
			>
				<X className="size-4" />
			</button>
		</span>
	);
}

interface AvatarNameProps {
	name: string;
	index: number;
	visible: boolean;
}

export function AvatarName({ name, index, visible }: AvatarNameProps) {
	// keep the name for screen readers while it is hidden
	if (!visible) return <span className="sr-only">{name}</span>;

	return (
		<span
			className="cursor-pointer whitespace-nowrap font-medium text-gray-700 text-sm underline-offset-2 hover:underline"
			data-animate={`name-${index}`}
		>
			{name}
		</span>
	);
}
