import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const alertBadgeVariants = cva(
  "inline-flex items-center gap-2.5 rounded-full px-2.5 py-1.5 text-[0.75rem] font-medium text-white transition-colors duration-200",
  {
    variants: {
      variant: {
        error: "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
        success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
        info: "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
        shorekeeper: "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
        tethys: "bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

interface AlertBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof alertBadgeVariants> {
  icon?: LucideIcon
  label: string
}

export function AlertBadge({
  className,
  variant,
  icon: Icon,
  label,
  ...props
}: AlertBadgeProps) {
  return (
    <span className={cn(alertBadgeVariants({ variant }), className)} {...props}>
      <span className="inline-flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" aria-hidden={true} />}
        {label}
      </span>
    </span>
  )
}
