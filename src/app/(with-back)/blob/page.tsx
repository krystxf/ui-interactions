"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePath, SvgShape } from "react-svg-shape";

const INTERVAL_DURATION = 4_000;
const DEFAULT_CONTRAST = 4;
const PRESSED_CONTRAST = 6;

const generateShapePath = (contrast: number) =>
	generatePath({ complexity: 16, contrast });

function isSafariOrIOSBrowser() {
	const ua = navigator.userAgent;
	const isIOS = /iPad|iPhone|iPod/.test(ua);
	const isWebkit = /WebKit/.test(ua);
	const isChromeLike = /CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Chromium|Android/.test(
		ua,
	);
	return isIOS || (isWebkit && !isChromeLike);
}

export default function BlobPage() {
	const [svgPath, setSvgPath] = useState<string | null>(null);
	const [animationDisabled, setAnimationDisabled] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const contrastRef = useRef(DEFAULT_CONTRAST);

	const resetInterval = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setSvgPath(generateShapePath(contrastRef.current));
		}, INTERVAL_DURATION);
	}, []);

	useEffect(() => {
		const shouldDisableAnimation = isSafariOrIOSBrowser();
		setAnimationDisabled(shouldDisableAnimation);

		setSvgPath(generateShapePath(DEFAULT_CONTRAST));
		if (!shouldDisableAnimation) {
			resetInterval();
		}

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [resetInterval]);

	const handlePointerDown = () => {
		if (animationDisabled) return;
		contrastRef.current = PRESSED_CONTRAST;
		setSvgPath(generateShapePath(PRESSED_CONTRAST));
		resetInterval();
	};

	const handlePointerUp = () => {
		if (animationDisabled) return;
		contrastRef.current = DEFAULT_CONTRAST;
		setSvgPath(generateShapePath(DEFAULT_CONTRAST));
		resetInterval();
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: full-page press area for morphing blob
		// biome-ignore lint/a11y/useKeyWithClickEvents: decorative interaction, not a semantic control
		<div
			className={`relative isolate flex min-h-screen select-none flex-col items-center justify-center px-8 ${animationDisabled ? "cursor-default" : "cursor-pointer"}`}
			onClick={(e) => e.preventDefault()}
			onPointerDown={handlePointerDown}
			onPointerLeave={handlePointerUp}
			onPointerUp={handlePointerUp}
		>
			<div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${svgPath ? "animate-blob-appear" : "opacity-[0.2]"}`}>
				{svgPath && (
					<SvgShape height={500} width={500}>
						<SvgShape.Path
							colors={["#7c3aed", "#2563eb"]}
							style={{
								transition: animationDisabled
									? "none"
									: `all ${INTERVAL_DURATION / 1000}s linear`,
							}}
							svgPath={svgPath}
						/>
					</SvgShape>
				)}
			</div>
			<div className="relative z-10 flex flex-col items-center gap-1 text-center">
				<h1 className="font-bold text-2xl text-white">Animated Blob</h1>
				<p className="text-sm text-white/80">
					{animationDisabled
						? "Static on Safari and iOS"
						: "Press and hold to increase contrast"}
				</p>
				<Link
					className="mt-2 text-sm text-white/60 underline underline-offset-2 transition-colors hover:text-white/90"
					href="https://github.com/krystxf/react-svg-shape"
					onClick={(e) => e.stopPropagation()}
					onPointerDown={(e) => e.stopPropagation()}
					target="_blank"
				>
					react-svg-shape
				</Link>
			</div>
		</div>
	);
}
