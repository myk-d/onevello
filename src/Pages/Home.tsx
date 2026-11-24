import { Button } from 'perkslab-ui';
import { useCallback, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import LogoSvg from '../components/UI/SVG/LogoSvg';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { UrlConfig } from '../constants/UrlConfig';

const SECURITY_POLICY_URL = `${UrlConfig.repoURL}/blob/master/SECURITY.md`;
const SECURITY_EMAIL = 'security@myslennya.com';

const CheckIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M5 12.5l4.5 4.5L19 7.5" />
	</svg>
);

const WarnIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M12 4l9 16H3z" />
		<path d="M12 10v4M12 17h.01" />
	</svg>
);

interface Step {
	title: string;
	desc: string;
}
interface Feature {
	value: string;
	label: string;
}
interface FaqItem {
	q: string;
	a: string;
}

const Home = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleNavigate = useCallback((to: string) => () => navigate(to), [navigate]);

	useEffect(() => {
		if (localStorage.getItem(isSecretWasCreatedOnDeviceStorageKey) === 'true') {
			localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
			navigate(UrlConfig.secret);
		}
	}, [navigate]);

	const list = <T,>(key: string) => t(key, { returnObjects: true }) as T[];
	const facts = list<string>('landing.hero.facts');
	const chips = list<string>('landing.hero.visual.chips');
	const steps = list<Step>('landing.how.steps');
	const yes = list<string>('landing.protection.yes');
	const no = list<string>('landing.protection.no');
	const features = list<Feature>('landing.features.items');
	const faq = list<FaqItem>('landing.faq.items');

	return (
		<div className="lp">
			<section className="lp-hero">
				<div className="lp-in">
					<div>
						<h1>
							<Trans i18nKey="landing.hero.heading" components={{ em: <em />, br: <br /> }} />
						</h1>
						<p className="lead">{t('landing.hero.lead')}</p>
						<div className="cta">
							<Button type="button" variant="default" size="lg" onClick={handleNavigate(UrlConfig.secret)}>
								{t('landing.hero.createSecret')}
							</Button>
							<Button type="button" variant="outline" size="lg" onClick={handleNavigate(UrlConfig.about)}>
								{t('landing.hero.howItWorks')}
							</Button>
						</div>
						<ul className="facts">
							{facts.map((f) => (
								<li key={f}>{f}</li>
							))}
						</ul>
					</div>
					<div className="lp-visual" aria-hidden="true">
						<div className="lp-card">
							<span className="label">{t('landing.hero.visual.label')}</span>
							<div className="ov-secret">{t('landing.hero.visual.link')}</div>
							<div className="chips">
								{chips.map((c) => (
									<span key={c} className="ov-chip ov-chip--info">
										{c}
									</span>
								))}
							</div>
							<p>{t('landing.hero.visual.note')}</p>
						</div>
						<span className="seal-badge">
							<LogoSvg size={96} />
						</span>
					</div>
				</div>
			</section>

			<section className="lp-sec" id="how">
				<div className="lp-in">
					<div>
						<h2>{t('landing.how.title')}</h2>
						<p className="sec-lead">{t('landing.how.lead')}</p>
					</div>
					<ol className="lp-steps">
						{steps.map((s, i) => (
							<li key={s.title}>
								<span className="n">0{i + 1}</span>
								<h3>{s.title}</h3>
								<p>{s.desc}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="lp-sec">
				<div className="lp-in">
					<div>
						<h2>{t('landing.protection.title')}</h2>
						<p className="sec-lead">{t('landing.protection.lead')}</p>
					</div>
					<div className="lp-prot">
						<div className="yes">
							<h3>{t('landing.protection.yesTitle')}</h3>
							<ul>
								{yes.map((x) => (
									<li key={x}>
										<CheckIcon />
										<span>{x}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="no">
							<h3>{t('landing.protection.noTitle')}</h3>
							<ul data-testid="not-protected">
								{no.map((x) => (
									<li key={x}>
										<WarnIcon />
										<span>{x}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="lp-sec">
				<div className="lp-in">
					<h2>{t('landing.features.title')}</h2>
					<ul className="lp-feat">
						{features.map((f) => (
							<li key={f.value}>
								<span className="v">{f.value}</span>
								<p>{f.label}</p>
							</li>
						))}
					</ul>
					<p className="sec-lead m-0">{t('landing.features.note')}</p>
				</div>
			</section>

			<section className="lp-sec">
				<div className="lp-in">
					<h2>{t('landing.faq.title')}</h2>
					<div className="lp-faq">
						{faq.map((item) => (
							<details key={item.q}>
								<summary>{item.q}</summary>
								<p>{item.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="lp-sec">
				<div className="lp-in">
					<div className="lp-oss">
						<div>
							<h2>{t('landing.oss.title')}</h2>
							<p className="sec-lead">{t('landing.oss.lead')}</p>
						</div>
						<ul className="links">
							<li>
								<a href={UrlConfig.repoURL} target="_blank" rel="noopener noreferrer">
									<b>{t('landing.oss.source')}</b>
									<span className="mono">github.com/myk-d/onevello</span>
								</a>
							</li>
							<li>
								<a href={SECURITY_POLICY_URL} target="_blank" rel="noopener noreferrer">
									<b>{t('landing.oss.policy')}</b>
									<span className="mono">SECURITY.md</span>
								</a>
							</li>
							<li>
								<a href={`mailto:${SECURITY_EMAIL}`}>
									<b>{t('landing.oss.report')}</b>
									<span className="mono">{SECURITY_EMAIL}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="lp-final">
				<div className="lp-in">
					<LogoSvg size={64} intact />
					<h2>{t('landing.final.title')}</h2>
					<Button type="button" variant="default" size="lg" onClick={handleNavigate(UrlConfig.secret)}>
						{t('landing.final.button')}
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Home;
