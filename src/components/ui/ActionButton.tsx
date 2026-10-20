"use client";
import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SharedProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};
type ButtonProps = SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; external?: never };
type LinkProps = SharedProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; external?: boolean };
export type ActionButtonProps = ButtonProps | LinkProps;

const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants = {
  primary: "border border-cyan-200/30 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_0_#164b79,0_10px_20px_rgba(6,182,212,0.18)] hover:-translate-y-0.5 hover:shadow-[0_5px_0_#164b79,0_14px_25px_rgba(6,182,212,0.23)] active:translate-y-1 active:shadow-[0_1px_0_#164b79]",
  secondary: "border border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100 shadow-[0_4px_0_rgba(8,68,84,0.9)] hover:-translate-y-0.5 hover:bg-cyan-300/[0.13] active:translate-y-1 active:shadow-none",
  outline: "border border-cyan-300/30 bg-transparent text-cyan-100 shadow-[0_4px_0_rgba(8,68,84,0.72)] hover:-translate-y-0.5 hover:bg-cyan-300/[0.07] active:translate-y-1 active:shadow-none",
  ghost: "border border-transparent bg-transparent text-slate-200 hover:bg-white/[0.06] hover:text-white",
  glow: "relative border border-cyan-200/30 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_0_#263b79,0_10px_20px_rgba(79,70,229,0.22)] hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 active:translate-y-1 active:shadow-none",
  danger: "border border-rose-300/25 bg-rose-500/15 text-rose-100 shadow-[0_4px_0_rgba(105,30,52,0.9)] hover:-translate-y-0.5 hover:bg-rose-500/25 active:translate-y-1 active:shadow-none",
};

const sizes = {
  sm: "h-9 px-3 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

export function ActionButton(props: ActionButtonProps) {
    const { className, children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, href, external, disabled, ...attributes } = props;
    const combined = cn(baseStyles, variants[variant], sizes[size], className);
    const content = (
      <>
        {isLoading && <Loader2 className="animate-spin h-4 w-4 shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );
    if (href && !external) {
      return (
        <Link href={href} className={combined} {...(attributes as Omit<LinkProps, keyof SharedProps | "href" | "external">)}>
          {content}
        </Link>
      );
    }
    if (href && external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combined} {...(attributes as Omit<LinkProps, keyof SharedProps | "href" | "external">)}>
          {content}
        </a>
      );
    }
    return (
      <button {...(attributes as Omit<ButtonProps, keyof SharedProps | "href" | "external">)} disabled={disabled || isLoading} className={combined}>
        {content}
      </button>
    );
}

export default ActionButton;
