import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WithBackLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Link
				className="absolute top-6 left-6 z-50 flex items-center gap-1 text-gray-400 text-sm transition-colors hover:text-gray-600"
				href="/"
			>
				<ArrowLeft className="size-4" />
				Back
			</Link>
			{children}
		</>
	);
}
