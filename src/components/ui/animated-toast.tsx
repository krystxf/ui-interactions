import { gsap } from "gsap";
import { useCallback, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import type {
  AnimatedToastProps,
  ShowAnimatedToastProps,
  ToastVariantKey,
} from "./animated-toast.types";
import { toastVariants } from "./animated-toast.variants";

function getSlideOffset(position?: string): number {
  if (!position) return -20;
  return position.startsWith("top") ? -20 : 20;
}

function AnimatedToast({
  variant,
  message,
  toastId,
  duration = 3000,
  position,
}: AnimatedToastProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const dismissingRef = useRef(false);
  const v = toastVariants[variant];
  const Icon = v.icon;
  const slideOffset = getSlideOffset(position);

  const runExitAnimation = useCallback(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    const text = textRef.current;
    if (!container || !icon || !text || dismissingRef.current) return;
    dismissingRef.current = true;

    const exitTl = gsap.timeline({
      onComplete: () => {
        toast.dismiss(toastId);
      },
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
        y: slideOffset,
        duration: 0.3,
        ease: "power2.in",
      });
  }, [toastId, slideOffset]);

  useEffect(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    const text = textRef.current;
    if (!container || !icon || !text) return;

    gsap.set(container, { scale: 0.6, opacity: 0, y: slideOffset });
    gsap.set(icon, { backgroundColor: "transparent" });
    gsap.set(text, { width: 0, opacity: 0, marginLeft: 0 });

    const tl = gsap.timeline();

    tl.to(container, {
      opacity: 1,
      scale: 1.1,
      y: 0,
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
  }, [v, duration, runExitAnimation, slideOffset]);

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
        className="flex items-center overflow-hidden whitespace-nowrap"
      >
        <span className="flex flex-col leading-tight">
          <span className={`text-sm ${v.labelColor}`}>{v.label}</span>
          <span className={v.textColor}>{message}</span>
        </span>
      </span>
    </div>
  );
}

function showAnimatedToast({
  variant,
  message,
  duration,
  position = "top-center",
}: ShowAnimatedToastProps) {
  toast.custom(
    (id) => (
      <AnimatedToast
        variant={variant}
        message={message}
        toastId={id}
        duration={duration}
        position={position}
      />
    ),
    {
      duration: Number.POSITIVE_INFINITY,
      position,
      unstyled: true,
    },
  );
}

const AnimatedToaster = () => <Toaster toastOptions={{ unstyled: true }} />;

export type { ToastVariantKey };
export { AnimatedToaster, showAnimatedToast };
