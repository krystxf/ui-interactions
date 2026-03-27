import type { ComponentType } from "react";
import type { ToasterProps } from "sonner";

export type ToastPosition = ToasterProps["position"];

export interface ToastVariant {
	bgColor: string;
	iconBgColor: string;
	iconColor: string;
	label: string;
	labelColor: string;
	textColor: string;
	icon: ComponentType<{
		animate?: boolean;
		className?: string;
		duration?: number;
		ease?: string;
		repeat?: number;
		rotation?: string;
		strokeWidth?: number;
	}>;
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
