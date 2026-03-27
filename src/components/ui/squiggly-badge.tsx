"use client";

import { gsap } from "gsap";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef } from "react";
import { BadgeIcon } from "@/components/icons/badge";
import {
	BadgeAlertInner,
	BadgeCheckInner,
	BadgeInfoInner,
	BadgeXInner,
} from "@/components/icons/badge-inner";

interface SquigglyBadgeProps {
	Inner: ComponentType<SVGProps<SVGSVGElement>>;
	animate?: boolean;
	className?: string;
	duration?: number;
	ease?: string;
	repeat?: number;
	rotation?: string;
	strokeWidth?: number;
}

export function SquigglyBadge({
	Inner,
	animate = false,
	className,
	duration = 6,
	ease = "none",
	repeat = -1,
	rotation = "+=360",
	strokeWidth = 2,
}: SquigglyBadgeProps) {
	const badgeRef = useRef<SVGSVGElement>(null);
	const tweenRef = useRef<gsap.core.Tween | null>(null);
	const rampRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		if (!badgeRef.current) return;

		tweenRef.current = gsap.to(badgeRef.current, {
			rotation,
			duration,
			repeat,
			ease,
		});
		tweenRef.current.timeScale(0);

		return () => {
			rampRef.current?.kill();
			tweenRef.current?.kill();
			tweenRef.current = null;
			rampRef.current = null;
		};
	}, [duration, ease, repeat, rotation]);

	useEffect(() => {
		if (!tweenRef.current) return;

		rampRef.current?.kill();
		rampRef.current = gsap.to(tweenRef.current, {
			timeScale: animate ? 1 : 0,
			duration: animate ? 0.5 : 2,
			ease: animate ? "power2.in" : "power2.out",
		});
	}, [animate]);

	return (
		<span
			className={`relative inline-flex items-center justify-center ${className ?? ""}`}
		>
			<BadgeIcon
				className="size-full"
				ref={badgeRef}
				strokeWidth={strokeWidth}
			/>
			<Inner className="absolute size-full" strokeWidth={strokeWidth} />
		</span>
	);
}

type SimpleProps = Omit<SquigglyBadgeProps, "Inner">;

export function SquigglyBadgeInfo(props: SimpleProps) {
	return <SquigglyBadge Inner={BadgeInfoInner} {...props} />;
}

export function SquigglyBadgeCheck(props: SimpleProps) {
	return <SquigglyBadge Inner={BadgeCheckInner} {...props} />;
}

export function SquigglyBadgeAlert(props: SimpleProps) {
	return <SquigglyBadge Inner={BadgeAlertInner} {...props} />;
}

export function SquigglyBadgeX(props: SimpleProps) {
	return <SquigglyBadge Inner={BadgeXInner} {...props} />;
}
