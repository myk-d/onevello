import React, { useId, useState } from 'react';

interface PassphraseInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	showLabel: string;
	hideLabel: string;
	invalid?: boolean;
	/** Extra text buttons inside the field group (e.g. Generate). */
	actions?: React.ReactNode;
}

/** Passphrase field group (`ov-pass`): mono input with a Show/Hide toggle and optional action buttons. */
export const PassphraseInput = React.forwardRef<HTMLInputElement, PassphraseInputProps>(
	({ showLabel, hideLabel, invalid, actions, id, ...rest }, ref) => {
		const [visible, setVisible] = useState(false);
		const autoId = useId();
		const inputId = id ?? autoId;
		return (
			<div className="ov-pass" data-invalid={invalid ? 'true' : undefined}>
				<input ref={ref} id={inputId} type={visible ? 'text' : 'password'} aria-invalid={invalid || undefined} {...rest} />
				<button type="button" aria-pressed={visible} aria-controls={inputId} onClick={() => setVisible((v) => !v)}>
					{visible ? hideLabel : showLabel}
				</button>
				{actions}
			</div>
		);
	},
);
PassphraseInput.displayName = 'PassphraseInput';
