"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import {
	SquigglyBadgeAlert,
	SquigglyBadgeCheck,
	SquigglyBadgeInfo,
	SquigglyBadgeX,
} from "@/components/ui/squiggly-badge";

const variants = [
	{
		Component: SquigglyBadgeInfo,
		color: "text-sky-700",
		bg: "bg-sky-100",
		orderClass: "order-2 md:order-1",
		haptic: "selection",
	},
	{
		Component: SquigglyBadgeCheck,
		color: "text-emerald-700",
		bg: "bg-emerald-100",
		orderClass: "order-1 md:order-2",
		haptic: "success",
	},
	{
		Component: SquigglyBadgeAlert,
		color: "text-amber-700",
		bg: "bg-amber-100",
		orderClass: "order-3",
		haptic: "warning",
	},
	{
		Component: SquigglyBadgeX,
		color: "text-red-700",
		bg: "bg-red-100",
		orderClass: "order-4",
		haptic: "error",
	},
] as const;

function HoverBadge({
	Component,
	color,
	bg,
	orderClass,
	onPress,
}: {
	Component: (typeof variants)[number]["Component"];
	color: string;
	bg: string;
	orderClass: string;
	onPress: () => void;
}) {
	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	return (
		<button
			className={`flex size-24 items-center justify-center rounded-full transition-all duration-150 ${hovered ? bg : "bg-gray-100"} ${pressed ? "scale-90" : "scale-100"} ${orderClass}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => {
				setHovered(false);
				setPressed(false);
			}}
			onPointerCancel={() => setPressed(false)}
			onPointerDown={() => {
				setPressed(true);
				onPress();
			}}
			onPointerUp={() => setPressed(false)}
			type="button"
		>
			<Component
				animate={hovered}
				className={`size-20 transition-colors duration-300 ${hovered ? color : "text-gray-400"}`}
				duration={12}
			/>
		</button>
	);
}

export default function SquiggliesPage() {
	const { trigger: haptic } = useWebHaptics();
	const lastHapticAtRef = useRef(0);

	const handlePress = (pattern: (typeof variants)[number]["haptic"]) => {
		const now = Date.now();
		if (now - lastHapticAtRef.current < 120) return;
		lastHapticAtRef.current = now;

		haptic(pattern);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="font-bold text-2xl text-gray-900">Squigglies</h1>
				<p className="text-gray-500 text-sm">Rotating squiggly circle icons</p>
				<Link
					className="mt-1 text-gray-400 text-sm underline underline-offset-2 transition-colors hover:text-gray-600"
					href="https://lucide.dev/icons/?search=badge"
					target="_blank"
				>
					lucide icons
				</Link>
			</div>
			<div className="grid grid-cols-2 gap-8 md:flex">
				{variants.map(
					({ Component, color, bg, orderClass, haptic: pattern }) => (
						<HoverBadge
							bg={bg}
							Component={Component}
							color={color}
							key={color}
							onPress={() => handlePress(pattern)}
							orderClass={orderClass}
						/>
					),
				)}
			</div>
		</div>
	);
}
