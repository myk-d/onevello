import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import LogoSvg from '../UI/SVG/LogoSvg';
import { Button } from '../UI/kit';

export type SecretGoneVariant = 'gone' | 'expired' | 'locked' | 'error';

interface SecretGoneProps {
	variant: SecretGoneVariant;
	onRetry?: () => void;
}

const GLYPH_PROPS = {
	width: 64,
	height: 64,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'var(--color-muted)',
	strokeWidth: 1.4,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	'aria-hidden': true,
} as const;

const Glyph = ({ variant }: { variant: SecretGoneVariant }) => {
	if (variant === 'gone' || variant === 'locked') return <LogoSvg size={88} />;

	if (variant === 'expired') {
		return (
			<svg {...GLYPH_PROPS}>
				<circle cx="12" cy="12" r="9" />
				<path d="M12 7v5l3 2" />
			</svg>
		);
	}

	return (
		<svg {...GLYPH_PROPS}>
			<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" />
			<path d="M12 19h.01" />
			<path d="M3 3l18 18" />
		</svg>
	);
};

// Failure screens for a secret link. Only `error` offers "Try again" and never says the secret is gone.
const SecretGone = ({ variant, onRetry }: SecretGoneProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const headingRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		headingRef.current?.focus();
	}, [variant]);

	return (
		<section className="mx-auto flex w-full max-w-[680px] flex-col gap-5 px-4 py-8 md:py-14">
			<div className="ov-card is-empty items-center text-center" data-variant={variant}>
				<Glyph variant={variant} />

				<div role={variant === 'error' ? 'alert' : 'status'} className="flex flex-col gap-2 items-center">
					<h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold leading-8 outline-none">
						{t(`secretGone.${variant}.title`)}
					</h1>
					<p className="max-w-[46ch] text-muted">{t(`secretGone.${variant}.description`)}</p>
				</div>

				<div className="flex w-full flex-col gap-3 sm:flex-row">
					{variant === 'error' ? (
						<Button type="button" onClick={onRetry} className="flex-1">
							{t('secretGone.retry')}
						</Button>
					) : (
						<>
							<Button type="button" onClick={() => navigate(UrlConfig.secret)} className="flex-1">
								{t('secretGone.createOwn')}
							</Button>
							<Button type="button" variant="secondary" onClick={() => navigate(UrlConfig.home)} className="flex-1">
								{t('secretGone.home')}
							</Button>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default SecretGone;
