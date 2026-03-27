import type { Ref, SVGProps } from "react";

export function BadgeIcon({
	ref,
	...props
}: SVGProps<SVGSVGElement> & { ref?: Ref<SVGSVGElement> }) {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			ref={ref}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
		</svg>
	);
}
