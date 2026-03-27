"use client";

import { Button, ListBox, Select } from "@heroui/react";
import { useState } from "react";
import {
	AnimatedToaster,
	showAnimatedToast,
} from "@/components/ui/animated-toast";
import {
	SquigglyBadgeAlert,
	SquigglyBadgeCheck,
	SquigglyBadgeInfo,
	SquigglyBadgeX,
} from "@/components/ui/squiggly-badge";

const positions = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
] as const;

type Position = (typeof positions)[number];

function ToastButtonWithBadge({
	Badge,
	label,
	message,
	variant,
	position,
	className,
}: {
	Badge: typeof SquigglyBadgeInfo;
	label: string;
	message: string;
	variant: "info" | "success" | "warning" | "error";
	position: Position;
	className: string;
}) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<Button
				className={className}
				onPress={() =>
					showAnimatedToast({
						variant,
						message,
						position,
					})
				}
				variant="secondary"
			>
				<Badge animate={hovered} className="size-6" />
				{label}
			</Button>
		</div>
	);
}

export default function ToastPage() {
	const [position, setPosition] = useState<Position>("top-center");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 px-8">
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="font-bold text-2xl text-gray-900">Animated Toasts</h1>
				<p className="text-gray-500 text-sm">
					Built on top of Sonner with GSAP animations
				</p>
			</div>
			<Select
				className="w-48"
				onSelectionChange={(key) => setPosition(key as Position)}
				placeholder="Select position"
				selectedKey={position}
			>
				<Select.Trigger>
					<Select.Value />
					<Select.Indicator />
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{positions.map((p) => (
							<ListBox.Item id={p} key={p} textValue={p}>
								{p}
							</ListBox.Item>
						))}
					</ListBox>
				</Select.Popover>
			</Select>
			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
				<ToastButtonWithBadge
					Badge={SquigglyBadgeInfo}
					className="w-full bg-sky-100 py-6 text-lg text-sky-700 transition-all sm:w-auto sm:py-2 sm:text-sm"
					label="info"
					message="Your changes have been saved"
					position={position}
					variant="info"
				/>
				<ToastButtonWithBadge
					Badge={SquigglyBadgeCheck}
					className="w-full bg-emerald-100 py-6 text-emerald-700 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
					label="success"
					message="Operation completed successfully"
					position={position}
					variant="success"
				/>
				<ToastButtonWithBadge
					Badge={SquigglyBadgeAlert}
					className="w-full bg-amber-100 py-6 text-amber-700 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
					label="warning"
					message="Please review before continuing"
					position={position}
					variant="warning"
				/>
				<ToastButtonWithBadge
					Badge={SquigglyBadgeX}
					className="w-full bg-red-100 py-6 text-lg text-red-700 transition-all sm:w-auto sm:py-2 sm:text-sm"
					label="error"
					message="Something went wrong"
					position={position}
					variant="error"
				/>
			</div>
			<AnimatedToaster />
		</div>
	);
}
