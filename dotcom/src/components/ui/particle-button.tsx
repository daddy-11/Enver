"use client" 

import * as React from "react"
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MousePointerClick } from "lucide-react";

// Assuming we have standard HTML button props here, since we don't have shadcn Button strictly defined in this file.
interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onSuccess?: () => void;
    successDuration?: number;
    asChild?: boolean;
}

function SuccessParticles({
    buttonRef,
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
        <AnimatePresence>
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-1.5 h-1.5 bg-purple-400 rounded-full z-50 pointer-events-none"
                    style={{ left: centerX, top: centerY }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        scale: [0, 1.5, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

const ParticleButton = React.forwardRef<HTMLButtonElement, ParticleButtonProps>(
  ({ children, onClick, onSuccess, successDuration = 1000, className, ...props }, forwardedRef) => {
    const [showParticles, setShowParticles] = useState(false);
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (forwardedRef as any) || internalRef;

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowParticles(true);
        if (onClick) onClick(e);

        setTimeout(() => {
            setShowParticles(false);
            if (onSuccess) onSuccess();
        }, successDuration);
    };

    return (
        <>
            {showParticles && <SuccessParticles buttonRef={buttonRef} />}
            <button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative transition-transform duration-100",
                    showParticles && "scale-95",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        </>
    );
});

ParticleButton.displayName = "ParticleButton";

export { ParticleButton }
