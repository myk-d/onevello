import React from 'react';
import { cn } from '../../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Dashed, transparent variant for empty states. */
	empty?: boolean;
}

/** Brand card (`ov-card`). */
export const Card: React.FC<CardProps> = ({ empty, className, ...rest }) => (
	<div className={cn('ov-card', empty && 'is-empty', className)} {...rest} />
);
