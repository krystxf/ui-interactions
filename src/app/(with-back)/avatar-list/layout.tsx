import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Avatar List",
	description: "Overlapping stack of user avatars",
};

export default function AvatarListLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
