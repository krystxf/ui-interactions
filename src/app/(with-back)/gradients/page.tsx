import { GradientBlobSvg } from "@/components/gradient-blob-svg";

export default function GradientPage() {
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center px-8">
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
			>
				<GradientBlobSvg className="h-full w-full opacity-50" />
			</div>
			<div className="relative z-10 flex flex-col items-center gap-1 text-center">
				<h1 className="font-bold text-2xl text-slate-900">Animated gradient</h1>
				<p className="text-slate-800/80 text-sm">
					Full-screen background with drifting color
				</p>
			</div>
		</div>
	);
}
