"use client";

import Link from "next/link";
import { useState } from "react";
import { GitHubIcon } from "@/components/icons/github";
import { SquigglyLine } from "@/components/patterns/squiggly-line";

export function Footer() {
	const [hovered, setHovered] = useState(false);

	return (
		<footer
			className="fixed bottom-0 w-full"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="mx-auto flex flex-col items-center gap-6 pb-6">
				<SquigglyLine animate={hovered} className="w-1/2 text-gray-300" />
				<Link
					className="flex items-center gap-2 bg-white py-2 text-gray-400 text-sm transition-colors hover:text-gray-600"
					href="https://github.com/krystxf/ui-interactions"
					rel="noopener noreferrer"
					target="_blank"
				>
					<GitHubIcon className="size-4" />
					Source code
				</Link>
			</div>
		</footer>
	);
}
