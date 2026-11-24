import { Button } from 'perkslab-ui';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import LogoSvg from '../UI/SVG/LogoSvg';

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
		<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
			<div className="border border-dashed w-full rounded-2xl py-5 px-7 flex flex-col gap-4 items-center" data-variant={variant}>
				<Glyph variant={variant} />

				<div role={variant === 'error' ? 'alert' : 'status'} className="flex flex-col gap-2 items-center">
					<h1 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
						{t(`secretGone.${variant}.title`)}
					</h1>
					<p className="text-muted">{t(`secretGone.${variant}.description`)}</p>
				</div>

				<div className="flex justify-center gap-6 flex-wrap w-full">
					{variant === 'error' ? (
						<Button type="button" variant="default" size="full" onClick={onRetry} className="flex-1 gap-2">
							{t('secretGone.retry')}
						</Button>
					) : (
						<>
							<Button type="button" variant="default" size="full" onClick={() => navigate(UrlConfig.secret)} className="flex-1 gap-2">
								{t('secretGone.createOwn')}
							</Button>
							<Button type="button" variant="outline" size="full" onClick={() => navigate(UrlConfig.home)} className="flex-1 gap-2">
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
