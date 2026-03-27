"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

function buildWavyCirclePath(
	cx: number,
	cy: number,
	radius: number,
	waves: number,
	amplitude: number,
	steps: number,
): string {
	const pts: [number, number][] = [];
	for (let i = 0; i <= steps; i++) {
		const angle = (i / steps) * Math.PI * 2;
		const r = radius + amplitude * Math.sin(angle * waves);
		pts.push([
			cx + r * Math.cos(angle - Math.PI / 2),
			cy + r * Math.sin(angle - Math.PI / 2),
		]);
	}

	let d = `M${pts[0]?.[0].toFixed(3)},${pts[0]?.[1].toFixed(3)}`;
	for (let i = 1; i < pts.length - 1; i++) {
		const mx = ((pts[i]?.[0] ?? 0) + (pts[i + 1]?.[0] ?? 0)) / 2;
		const my = ((pts[i]?.[1] ?? 0) + (pts[i + 1]?.[1] ?? 0)) / 2;
		d += ` Q${pts[i]?.[0].toFixed(3)},${pts[i]?.[1].toFixed(3)} ${mx.toFixed(3)},${my.toFixed(3)}`;
	}
	return `${d} Z`;
}

const wavyPath = buildWavyCirclePath(50, 50, 40, 16, 1.0, 300);

export function NotFoundContent() {
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		if (!pathRef.current) return;

		const tween = gsap.to(pathRef.current, {
			rotation: "+=360",
			duration: 60,
			repeat: -1,
			ease: "none",
			transformOrigin: "50% 50%",
		});

		return () => {
			tween.kill();
		};
	}, []);

	return (
		<div className="relative flex size-[min(32rem,100svw)] items-center justify-center">
			<svg
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 size-full text-gray-200"
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d={wavyPath}
					fill="none"
					ref={pathRef}
					stroke="currentColor"
					strokeWidth="0.2"
					suppressHydrationWarning
				/>
			</svg>
			<div className="flex flex-col items-center gap-4">
				<h1 className="font-bold text-7xl text-gray-900">4*4</h1>
				<p className="text-gray-500">Page not found</p>
				<Link
					className="text-gray-500 underline transition-colors hover:text-gray-900"
					href="/"
				>
					Go home
				</Link>
			</div>
		</div>
	);
}
