import type { Ref, SVGProps } from "react";

export function GradientBlobSvg({
	ref,
	...props
}: SVGProps<SVGSVGElement> & { ref?: Ref<SVGSVGElement> }) {
	return (
		<svg
			height="907"
			preserveAspectRatio="xMidYMid meet"
			ref={ref}
			viewBox="0 0 364 907"
			width="364"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Animated decorative gradient shape</title>
			<g filter="url(#filter0_iiif)">
				<path fill="#FFFFFF" opacity="0.3">
					<animate
						attributeName="d"
						calcMode="linear"
						dur="30s"
						repeatCount="indefinite"
						values="
        M500 400C491.7 325 426.7 216.7 370 170C313.3 123.3 228.3 106.7 160 120C91.7 133.3 3.3 195 -40 250C-83.3 305 -108.3 378.3 -100 450C-91.7 521.7 -43.3 628.3 10 680C63.3 731.7 151.7 770 220 760C288.3 750 373.3 680 420 620C466.7 560 508.3 475 500 400Z;
        M420 470C430 405 456.7 256.7 410 200C363.3 143.3 218.3 116.7 140 130C61.7 143.3 -23.3 221.7 -60 280C-96.7 338.3 -83.3 410 -80 480C-76.7 550 -78.3 663.3 -40 700C-1.7 736.7 85 718.3 150 700C215 681.7 305 628.3 350 590C395 551.7 410 535 420 470Z;
        M440 370C423.3 283.3 383.3 195 330 150C276.7 105 186.7 91.7 120 100C53.3 108.3 -41.7 138.3 -70 200C-98.3 261.7 -70 385 -50 470C-30 555 1.7 660 50 710C98.3 760 176.7 776.7 240 770C303.3 763.3 396.7 736.7 430 670C463.3 603.3 456.7 456.7 440 370Z;
        M460 440C461.7 370 443.3 286.7 400 240C356.7 193.3 266.7 165 200 160C133.3 155 51.7 166.7 0 210C-51.7 253.3 -105 340 -110 420C-115 500 -76.7 635 -30 690C16.7 745 100 755 170 750C240 745 341.7 711.7 390 660C438.3 608.3 458.3 510 460 440Z;
        M480 410C470 331.7 400 230 350 180C300 130 235 100 180 110C125 120 60 181.7 20 240C-20 298.3 -53.3 393.3 -60 460C-66.7 526.7 -61.7 590 -20 640C21.7 690 118.3 758.3 190 760C261.7 761.7 361.7 708.3 410 650C458.3 591.7 490 488.3 480 410Z;
        M500 400C491.7 325 426.7 216.7 370 170C313.3 123.3 228.3 106.7 160 120C91.7 133.3 3.3 195 -40 250C-83.3 305 -108.3 378.3 -100 450C-91.7 521.7 -43.3 628.3 10 680C63.3 731.7 151.7 770 220 760C288.3 750 373.3 680 420 620C466.7 560 508.3 475 500 400Z"
					/>
				</path>
			</g>
			<defs>
				<filter
					colorInterpolationFilters="sRGB"
					filterUnits="userSpaceOnUse"
					height="1100"
					id="filter0_iiif"
					width="900"
					x="-250"
					y="-100"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						in="SourceGraphic"
						in2="BackgroundImageFix"
						mode="normal"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx="-60" dy="-60" />
					<feGaussianBlur stdDeviation="15" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.922 0 0 0 0 0.325 0 0 0 0 0.235 0 0 0 1 0"
					/>
					<feBlend in2="shape" mode="normal" result="effect1_innerShadow" />
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx="140" />
					<feGaussianBlur stdDeviation="40" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.961 0 0 0 0 0.533 0 0 0 0 0.259 0 0 0 1 0"
					/>
					<feBlend
						in2="effect1_innerShadow"
						mode="normal"
						result="effect2_innerShadow"
					/>
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx="30" dy="60" />
					<feGaussianBlur stdDeviation="35" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.878 0 0 0 0 0.353 0 0 0 0 0.533 0 0 0 1 0"
					/>
					<feBlend
						in2="effect2_innerShadow"
						mode="normal"
						result="effect3_innerShadow"
					/>
					<feGaussianBlur result="effect4_foregroundBlur" stdDeviation="25" />
				</filter>
			</defs>
		</svg>
	);
}
