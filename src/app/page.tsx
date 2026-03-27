import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="font-bold text-2xl text-gray-900">UI Interactions</h1>
			<Link
				className="text-gray-500 underline transition-colors hover:text-gray-900"
				href="/toast"
			>
				Animated Toasts
			</Link>
			<Link
				className="text-gray-500 underline transition-colors hover:text-gray-900"
				href="/squigglies"
			>
				Squigglies
			</Link>
			<Link
				className="text-gray-500 underline transition-colors hover:text-gray-900"
				href="/gradients"
			>
				Gradients
			</Link>
		</main>
	);
}
