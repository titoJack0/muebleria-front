import React from 'react';
import { cn } from './Button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Componente Input reutilizable con soporte para etiquetas y mensajes de error
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-wood-dark">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-sm border border-wood/30 bg-white px-3 py-2 text-sm text-deepBlack transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-earth/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wood disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
