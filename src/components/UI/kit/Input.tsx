import React from 'react';
import { cn } from '../../../utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

/** Brand text input (`ov-input`). `invalid` sets aria-invalid (red border). */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ invalid, className, ...rest }, ref) => (
	<input ref={ref} aria-invalid={invalid || undefined} className={cn('ov-input', className)} {...rest} />
));
Input.displayName = 'Input';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ invalid, className, ...rest }, ref) => (
	<textarea ref={ref} aria-invalid={invalid || undefined} className={cn('ov-textarea', className)} {...rest} />
));
Textarea.displayName = 'Textarea';
