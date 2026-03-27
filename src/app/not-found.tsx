import type { Metadata } from "next";
import { NotFoundContent } from "./not-found-content";

export const metadata: Metadata = {
	title: "404 - Page Not Found",
	description: "The page you are looking for does not exist",
};

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<NotFoundContent />
		</main>
	);
}
