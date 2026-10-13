"use client";

import { cn } from "@/lib/utils";
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

interface AvatarListProps extends AvatarAnimationProps {
	avatars: Avatar[];
	className?: string;
	max?: number;
	size?: number;
	/** Heading of the expanded list */
	title?: string;
}

export function AvatarList({
	avatars,
	className,
	max = 4,
	size = 32,
	title = "People",
	duration = 250,
	stagger = 40,
	nameDelay = 40,
}: AvatarListProps) {
	// p-2 padding, so the collapsed list is a pill
	const radius = size / 2 + 8;
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

	const visible = expanded ? avatars : avatars.slice(0, max);
	const overflow = avatars.length - visible.length;

	const items = visible.map((avatar, index) => (
		<span
			className={cn("flex items-center gap-3", !expanded && "-ml-2 first:ml-0")}
			key={avatar.src ?? avatar.name}
		>
			<AvatarImage
				avatar={avatar}
				className="ring-(--avatar-list-bg) ring-2"
				data-animate={`avatar-${index}`}
				size={size}
			/>
			<AvatarName index={index} name={avatar.name} visible={expanded} />
		</span>
	));

	return (
		<AvatarListBox
			boxRef={boxRef}
			className={className}
			containerRef={containerRef}
			expanded={expanded}
			radius={radius}
		>
			{expanded ? (
				<AvatarListScroll
					aria-label={title}
					className="px-4 pb-2"
					onKeyDown={onKeyDown}
				>
					<AvatarListHeader
						// spans the full width so rows hide under it, the close button in the corner
						className="-mx-4 pt-2 pr-2 pb-1 pl-4"
						closeRef={closeRef}
						onClose={toggle}
						title={title}
					/>
					{items}
				</AvatarListScroll>
			) : (
				<button
					aria-expanded={false}
					aria-label={`Show ${title}`}
					className="flex cursor-pointer items-center rounded-[inherit] p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
					onClick={toggle}
					ref={triggerRef}
					type="button"
				>
					{items}
					{overflow > 0 && (
						<span
							className="relative -ml-2 flex shrink-0 items-center justify-center rounded-full bg-white font-medium text-gray-600 text-xs ring-(--avatar-list-bg) ring-2"
							data-animate="overflow"
							style={{ width: size, height: size }}
						>
							+{overflow}
						</span>
					)}
				</button>
			)}
		</AvatarListBox>
	);
}
