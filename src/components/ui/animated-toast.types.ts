import type { ComponentType, SVGProps } from "react";
import type { ToasterProps } from "sonner";

export type ToastPosition = ToasterProps["position"];

export interface ToastVariant {
	bgColor: string;
	iconBgColor: string;
	iconColor: string;
	label: string;
	labelColor: string;
	textColor: string;
	icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
}

export type ToastVariantKey = "info" | "success" | "warning" | "error";

export interface AnimatedToastProps {
	variant: ToastVariantKey;
	message: string;
	toastId: string | number;
	duration?: number;
	position?: ToastPosition;
}

export interface ShowAnimatedToastProps {
	variant: ToastVariantKey;
	message: string;
	duration?: number;
	position?: ToastPosition;
}
