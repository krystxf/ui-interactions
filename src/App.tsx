import { Button, ListBox, Select } from "@heroui/react";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";
import { useState } from "react";
import {
	AnimatedToaster,
	showAnimatedToast,
} from "./components/ui/animated-toast";

const positions = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
] as const;

type Position = (typeof positions)[number];

function App() {
	const [position, setPosition] = useState<Position>("top-center");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 px-8">
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="font-bold text-2xl text-gray-900">Animated Toasts</h1>
				<p className="text-gray-500 text-sm">
					Built on top of Sonner with GSAP animations
				</p>
			</div>
			<Select
				placeholder="Select position"
				selectedKey={position}
				onSelectionChange={(key) => setPosition(key as Position)}
				className="w-48"
			>
				<Select.Trigger>
					<Select.Value />
					<Select.Indicator />
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{positions.map((p) => (
							<ListBox.Item key={p} id={p} textValue={p}>
								{p}
							</ListBox.Item>
						))}
					</ListBox>
				</Select.Popover>
			</Select>
			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
				<Button
					variant="secondary"
					className="w-full bg-sky-100 py-6 text-lg text-sky-700 transition-all sm:w-auto sm:py-2 sm:text-sm"
					onPress={() =>
						showAnimatedToast({
							variant: "info",
							message: "Your changes have been saved",
							position,
						})
					}
				>
					<BadgeInfo className="size-4" />
					info
				</Button>
				<Button
					variant="secondary"
					className="w-full bg-emerald-100 py-6 text-emerald-700 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
					onPress={() =>
						showAnimatedToast({
							variant: "success",
							message: "Operation completed successfully",
							position,
						})
					}
				>
					<BadgeCheck className="size-4" />
					success
				</Button>
				<Button
					variant="secondary"
					className="w-full bg-amber-100 py-6 text-amber-700 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
					onPress={() =>
						showAnimatedToast({
							variant: "warning",
							message: "Please review before continuing",
							position,
						})
					}
				>
					<BadgeAlert className="size-4" />
					warning
				</Button>
				<Button
					variant="secondary"
					className="w-full bg-red-100 py-6 text-lg text-red-700 transition-all sm:w-auto sm:py-2 sm:text-sm"
					onPress={() =>
						showAnimatedToast({
							variant: "error",
							message: "Something went wrong",
							position,
						})
					}
				>
					<BadgeX className="size-4" />
					error
				</Button>
			</div>
			<AnimatedToaster />
			<a
				href="https://github.com/krystxf/ui-interactions"
				target="_blank"
				rel="noopener noreferrer"
				className="fixed bottom-4 flex items-center gap-2 text-gray-400 text-sm transition-colors hover:text-gray-600"
			>
				<svg
					className="size-4"
					viewBox="0 0 24 24"
					fill="currentColor"
					role="img"
					aria-label="GitHub"
				>
					<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
				</svg>
				Source code
			</a>
		</div>
	);
}

export default App;
