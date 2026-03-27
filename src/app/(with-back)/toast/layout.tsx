import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Animated Toasts",
	description:
		"Animated toast notifications built on top of Sonner with GSAP animations",
};

export default function ToastLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
