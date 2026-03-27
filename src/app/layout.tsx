import "@/styles/globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: {
		default: "UI Interactions",
		template: "%s | UI Interactions",
	},
	description: "Interactive UI components and animations",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
