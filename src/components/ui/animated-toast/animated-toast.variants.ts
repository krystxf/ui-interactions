import {
	SquigglyBadgeAlert,
	SquigglyBadgeCheck,
	SquigglyBadgeInfo,
	SquigglyBadgeX,
} from "@/components/ui/squiggly-badge";
import type { ToastVariant, ToastVariantKey } from "./animated-toast.types";

export const toastVariants: Record<ToastVariantKey, ToastVariant> = {
	info: {
		bgColor: "rgba(186, 230, 253, 0.3)",
		iconBgColor: "rgba(186, 230, 253, 0.6)",
		iconColor: "text-sky-700",
		label: "Info",
		labelColor: "text-sky-700/50",
		textColor: "text-sky-800/60",
		icon: SquigglyBadgeInfo,
	},
	success: {
		bgColor: "rgba(167, 243, 208, 0.3)",
		iconBgColor: "rgba(167, 243, 208, 0.6)",
		iconColor: "text-emerald-700",
		label: "Success",
		labelColor: "text-emerald-700/50",
		textColor: "text-emerald-800/60",
		icon: SquigglyBadgeCheck,
	},
	warning: {
		bgColor: "rgba(253, 230, 138, 0.3)",
		iconBgColor: "rgba(253, 230, 138, 0.6)",
		iconColor: "text-amber-700",
		label: "Warning",
		labelColor: "text-amber-700/50",
		textColor: "text-amber-800/60",
		icon: SquigglyBadgeAlert,
	},
	error: {
		bgColor: "rgba(254, 202, 202, 0.3)",
		iconBgColor: "rgba(254, 202, 202, 0.6)",
		iconColor: "text-red-700",
		label: "Error",
		labelColor: "text-red-700/50",
		textColor: "text-red-800/60",
		icon: SquigglyBadgeX,
	},
};
