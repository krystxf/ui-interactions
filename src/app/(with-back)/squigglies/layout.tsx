import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Squigglies",
	description: "Rotating squiggly circle icons with GSAP animations",
};

export default function SquiggliesLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
