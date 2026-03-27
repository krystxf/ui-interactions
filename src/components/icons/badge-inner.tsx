import type { SVGProps } from "react";

const svgProps = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

export function BadgeInfoInner(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" {...svgProps} {...props}>
			<line x1="12" x2="12" y1="16" y2="12" />
			<line x1="12" x2="12.01" y1="8" y2="8" />
		</svg>
	);
}

export function BadgeCheckInner(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" {...svgProps} {...props}>
			<path d="m9 12 2 2 4-4" />
		</svg>
	);
}

export function BadgeAlertInner(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" {...svgProps} {...props}>
			<path d="M12 8v4" />
			<path d="M12 16h.01" />
		</svg>
	);
}

export function BadgeXInner(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden="true" {...svgProps} {...props}>
			<path d="m15 9-6 6" />
			<path d="m9 9 6 6" />
		</svg>
	);
}
