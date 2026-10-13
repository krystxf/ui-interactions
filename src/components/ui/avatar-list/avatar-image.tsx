import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { Avatar } from "./avatar-list.types";

interface AvatarImageProps extends HTMLAttributes<HTMLSpanElement> {
	avatar: Avatar;
	/** Rendered diameter in px */
	size: number;
}

export function AvatarImage({
	avatar,
	size,
	className,
	style,
	...props
}: AvatarImageProps) {
	return (
		<span
			{...props}
			className={cn(
				"flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200",
				className,
			)}
			style={{
				width: size,
				height: size,
				...(!avatar.src && { background: avatar.color ?? "#5f6368" }),
				...style,
			}}
		>
			{avatar.src ? (
				<Image
					alt=""
					className="size-full object-cover"
					draggable={false}
					height={Math.round(size)}
					src={avatar.src}
					width={Math.round(size)}
				/>
			) : (
				<span
					className="font-medium text-white leading-none"
					style={{ fontSize: size * 0.45 }}
				>
					{avatar.name.charAt(0).toUpperCase()}
				</span>
			)}
		</span>
	);
}
