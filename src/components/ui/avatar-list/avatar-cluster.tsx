"use client";

import { AvatarImage } from "./avatar-image";
import type { Avatar, AvatarAnimationProps } from "./avatar-list.types";
import {
	AvatarListBox,
	AvatarListHeader,
	AvatarListScroll,
	AvatarName,
} from "./avatar-list-parts";
import { useAvatarList } from "./use-avatar-list";
import "./avatar-list.css";

/** Center (x, y) and diameter (d) as % of the cluster, traced from Google Meet */
const SLOTS = [
	{ x: 37, y: 34.5, d: 43 },
	{ x: 73.5, y: 34.5, d: 21 },
	{ x: 36, y: 76, d: 26.5 },
	{ x: 71.5, y: 70, d: 35 },
];

const EXPANDED_RADIUS = 24;
const LIST_SIZE = 32;

interface AvatarClusterProps extends AvatarAnimationProps {
	avatars: Avatar[];
	className?: string;
	/** Total shown next to the cluster, defaults to the number of avatars */
	count?: number;
	/** Heading of the expanded list */
	title?: string;
	/** Diameter of the cluster in px */
	size?: number;
}

export function AvatarCluster({
	avatars,
	className,
	count = avatars.length,
	title = "People",
	size = 80,
	duration = 250,
	stagger = 40,
	nameDelay = 40,
}: AvatarClusterProps) {
	const padding = size * 0.12;
	const collapsedRadius = size / 2 + padding;
	const {
		boxRef,
		closeRef,
		containerRef,
		expanded,
		onKeyDown,
		toggle,
		triggerRef,
	} = useAvatarList({
		avatarCount: avatars.length,
		duration,
		nameDelay,
		stagger,
	});

	return (
		<AvatarListBox
			boxRef={boxRef}
			className={className}
			containerRef={containerRef}
			expanded={expanded}
			radius={expanded ? EXPANDED_RADIUS : collapsedRadius}
		>
			{expanded ? (
				<AvatarListScroll
					aria-label={title}
					className="px-6 pb-4"
					onKeyDown={onKeyDown}
				>
					<AvatarListHeader
						// spans the full width so rows hide under it, the close button in the corner
						className="-mx-6 pt-4 pr-4 pb-1 pl-6"
						closeRef={closeRef}
						onClose={toggle}
						title={title}
					/>
					{avatars.map((avatar, index) => (
						<span
							className="flex items-center gap-3"
							key={avatar.src ?? avatar.name}
						>
							<AvatarImage
								avatar={avatar}
								data-animate={`avatar-${index}`}
								size={LIST_SIZE}
							/>
							<AvatarName index={index} name={avatar.name} visible />
						</span>
					))}
				</AvatarListScroll>
			) : (
				<button
					aria-expanded={false}
					aria-label={`Show ${title}`}
					className="flex cursor-pointer items-center rounded-[inherit] text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
					onClick={toggle}
					ref={triggerRef}
					style={{
						gap: size * 0.2,
						paddingBlock: padding,
						paddingLeft: padding,
						paddingRight: size * 0.4,
					}}
					type="button"
				>
					<span
						className="relative shrink-0 rounded-full bg-black/[0.03] ring-1 ring-black/5"
						data-animate="ring"
						style={{ width: size, height: size }}
					>
						{SLOTS.slice(0, avatars.length).map((slot, index) => {
							const avatar = avatars[index] as Avatar;
							return (
								<AvatarImage
									avatar={avatar}
									className="absolute"
									data-animate={`avatar-${index}`}
									key={avatar.src ?? avatar.name}
									size={(slot.d / 100) * size}
									style={{
										left: `${slot.x - slot.d / 2}%`,
										top: `${slot.y - slot.d / 2}%`,
									}}
								/>
							);
						})}
						{avatars.map((avatar) => (
							<span className="sr-only" key={avatar.src ?? avatar.name}>
								{avatar.name}
							</span>
						))}
					</span>
					<span
						className="shrink-0 text-gray-800 tabular-nums leading-none"
						data-animate="count"
						style={{ fontSize: size * 0.4 }}
					>
						{count}
					</span>
				</button>
			)}
		</AvatarListBox>
	);
}
