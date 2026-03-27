"use client";

import { gsap } from "gsap";
import { type SVGProps, useEffect, useRef } from "react";

export function SquigglyLine({
	animate = false,
	...props
}: SVGProps<SVGSVGElement> & { animate?: boolean }) {
	const patternRef = useRef<SVGPatternElement>(null);
	const tweenRef = useRef<gsap.core.Tween | null>(null);
	const rampRef = useRef<gsap.core.Tween | null>(null);

	// Create the looping tween once on mount
	useEffect(() => {
		if (!patternRef.current) return;

		tweenRef.current = gsap.to(patternRef.current, {
			attr: { x: "+=15" },
			duration: 2,
			repeat: -1,
			ease: "none",
		});
		tweenRef.current.timeScale(0);

		return () => {
			rampRef.current?.kill();
			tweenRef.current?.kill();
			tweenRef.current = null;
			rampRef.current = null;
		};
	}, []);

	// Ramp speed up/down when animate changes
	useEffect(() => {
		if (!tweenRef.current) return;

		rampRef.current?.kill();
		rampRef.current = gsap.to(tweenRef.current, {
			timeScale: animate ? 1 : 0,
			duration: animate ? 1 : 5,
			ease: animate ? "power2.in" : "power2.out",
		});
	}, [animate]);

	return (
		<svg
			aria-hidden="true"
			height="4"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<defs>
				<pattern
					height="4"
					id="squigglyPattern"
					patternUnits="userSpaceOnUse"
					ref={patternRef}
					width="15"
					x="0"
					y="0"
				>
					<path
						d="M0 1C3.80745 1 3.80745 3 7.6149 3C11.4223 3 11.4223 1 15.2298 1C19.0372 1 19.0372 3 22.8447"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
					/>
				</pattern>
				<linearGradient id="squigglyFade">
					<stop offset="0%" stopColor="white" stopOpacity="0" />
					<stop offset="15%" stopColor="white" stopOpacity="1" />
					<stop offset="85%" stopColor="white" stopOpacity="1" />
					<stop offset="100%" stopColor="white" stopOpacity="0" />
				</linearGradient>
				<mask id="squigglyMask">
					<rect fill="url(#squigglyFade)" height="4" width="100%" x="0" y="0" />
				</mask>
			</defs>
			<rect
				fill="url(#squigglyPattern)"
				height="4"
				mask="url(#squigglyMask)"
				width="100%"
				x="0"
				y="0"
			/>
		</svg>
	);
}
