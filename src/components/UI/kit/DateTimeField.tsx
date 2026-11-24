import dayjs from 'dayjs';
import React from 'react';
import { cn } from '../../../utils/cn';

interface DateTimeFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
	value: dayjs.Dayjs;
	onChange: (value: dayjs.Dayjs) => void;
}

const FORMAT = 'YYYY-MM-DDTHH:mm';

/** Native date + time input (`datetime-local`) in the brand input style. Emits a dayjs value; ignores cleared input. */
export const DateTimeField = React.forwardRef<HTMLInputElement, DateTimeFieldProps>(({ value, onChange, className, ...rest }, ref) => (
	<input
		ref={ref}
		type="datetime-local"
		className={cn('ov-input', className)}
		value={value.format(FORMAT)}
		min={dayjs().format(FORMAT)}
		onChange={(e) => {
			const next = dayjs(e.target.value);
			if (e.target.value && next.isValid()) onChange(next);
		}}
		{...rest}
	/>
));
DateTimeField.displayName = 'DateTimeField';
