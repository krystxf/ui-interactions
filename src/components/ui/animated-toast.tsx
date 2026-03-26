import { Button } from "@heroui/react";
import { gsap } from "gsap";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX, X } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useCallback, useEffect, useRef } from "react";
import { Toaster, type ToasterProps, toast } from "sonner";

type ToastPosition = ToasterProps["position"];

interface ToastVariant {
	bgColor: string;
	iconBgColor: string;
	iconColor: string;
	label: string;
	labelColor: string;
	textColor: string;
	icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
}

const toastVariants: Record<string, ToastVariant> = {
	info: {
		bgColor: "rgba(186, 230, 253, 0.3)",
		iconBgColor: "rgba(186, 230, 253, 0.6)",
		iconColor: "text-sky-700",
		label: "Info",
		labelColor: "text-sky-700/50",
		textColor: "text-sky-800/60",
		icon: BadgeInfo,
	},
	success: {
		bgColor: "rgba(167, 243, 208, 0.3)",
		iconBgColor: "rgba(167, 243, 208, 0.6)",
		iconColor: "text-emerald-700",
		label: "Success",
		labelColor: "text-emerald-700/50",
		textColor: "text-emerald-800/60",
		icon: BadgeCheck,
	},
	warning: {
		bgColor: "rgba(253, 230, 138, 0.3)",
		iconBgColor: "rgba(253, 230, 138, 0.6)",
		iconColor: "text-amber-700",
		label: "Warning",
		labelColor: "text-amber-700/50",
		textColor: "text-amber-800/60",
		icon: BadgeAlert,
	},
	error: {
		bgColor: "rgba(254, 202, 202, 0.3)",
		iconBgColor: "rgba(254, 202, 202, 0.6)",
		iconColor: "text-red-700",
		label: "Error",
		labelColor: "text-red-700/50",
		textColor: "text-red-800/60",
		icon: BadgeX,
	},
};

type ToastVariantKey = keyof typeof toastVariants;

function AnimatedToast({
	variant,
	message,
	toastId,
	duration = 3000,
	closable = false,
}: {
	variant: ToastVariantKey;
	message: string;
	toastId: string | number;
	duration?: number;
	closable?: boolean;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);
	const dismissingRef = useRef(false);
	const v = toastVariants[variant];
	const Icon = v.icon;

	const runExitAnimation = useCallback(() => {
		const container = containerRef.current;
		const icon = iconRef.current;
		const text = textRef.current;
		if (!container || !icon || !text || dismissingRef.current) return;
		dismissingRef.current = true;

		const exitTl = gsap.timeline({
			onComplete: () => { toast.dismiss(toastId); },
		});
		exitTl
			.to(text, {
				opacity: 0,
				duration: 0.2,
				ease: "power2.in",
			})
			.to(text, {
				width: 0,
				marginLeft: 0,
				duration: 0.35,
				ease: "power2.in",
			})
			.to(
				container,
				{
					paddingRight: "0.25rem",
					duration: 0.3,
					ease: "power2.in",
				},
				"<",
			)
			.to(
				icon,
				{
					backgroundColor: "transparent",
					duration: 0.35,
					ease: "power2.in",
				},
				"<",
			)
			.to(container, {
				scale: 0.6,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
			});
	}, [toastId]);

	useEffect(() => {
		const container = containerRef.current;
		const icon = iconRef.current;
		const text = textRef.current;
		if (!container || !icon || !text) return;

		gsap.set(container, { scale: 0.6, opacity: 0 });
		gsap.set(icon, { backgroundColor: "transparent" });
		gsap.set(text, { width: 0, opacity: 0, marginLeft: 0 });

		const tl = gsap.timeline();

		tl.to(container, {
			opacity: 1,
			scale: 1.1,
			backgroundColor: v.bgColor,
			duration: 0.3,
			ease: "power2.out",
		})
			.to(container, {
				scale: 1,
				duration: 0.25,
				ease: "power2.inOut",
			})
			.to(container, {
				paddingRight: "1.5rem",
				duration: 0.3,
				ease: "power2.out",
			})
			.to(
				icon,
				{
					backgroundColor: v.iconBgColor,
					duration: 0.3,
					ease: "power2.out",
				},
				"<",
			)
			.to(
				text,
				{
					width: "auto",
					marginLeft: "0.5rem",
					duration: 0.4,
					ease: "power2.out",
				},
				"<",
			)
			.to(
				text,
				{
					opacity: 1,
					duration: 0.25,
					ease: "power2.out",
				},
				"-=0.15",
			);

		const dismissTimeout = setTimeout(runExitAnimation, duration);
		return () => clearTimeout(dismissTimeout);
	}, [v, toastId, duration, runExitAnimation]);

	return (
		<div
			ref={containerRef}
			className="flex items-center overflow-hidden rounded-[1.75rem] border border-white/10 py-1.5 pr-1.5 pl-1.5 font-bold shadow-sm backdrop-blur-sm"
		>
			<div
				ref={iconRef}
				className="flex size-10 shrink-0 items-center justify-center rounded-full"
			>
				<Icon className={`size-8 ${v.iconColor}`} />
			</div>
			<span
				ref={textRef}
				className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
			>
				<span className="flex flex-col leading-tight">
					<span className={`text-sm ${v.labelColor}`}>{v.label}</span>
					<span className={v.textColor}>{message}</span>
				</span>
				{closable && (
					<Button
						isIconOnly
						size="sm"
						variant="ghost"
						onPress={runExitAnimation}
						className={`${v.textColor} shrink-0 min-w-0 h-auto p-1`}
					>
						<X className="size-4" />
					</Button>
				)}
			</span>
		</div>
	);
}

function showAnimatedToast(
	variant: ToastVariantKey,
	message: string,
	options?: { duration?: number; closable?: boolean; position?: ToastPosition },
) {
	toast.custom(
		(id) => (
			<AnimatedToast
				variant={variant}
				message={message}
				toastId={id}
				duration={options?.duration}
				closable={options?.closable}
			/>
		),
		{
			duration: Number.POSITIVE_INFINITY,
			position: options?.position ?? "bottom-left",
			unstyled: true,
		},
	);
}

const AnimatedToaster = () => <Toaster toastOptions={{ unstyled: true }} />;

export type { ToastVariantKey };
export { AnimatedToaster, showAnimatedToast };
