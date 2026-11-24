/* OneVello brand site — shared nav, theme/language toggles, logo marks and component renderers.
   Pages declare <div data-render="name"></div>; this script fills them. Sample data only. */
(function () {
	'use strict';

	/* ---------- pages ---------- */
	const PAGES = [
		{ href: 'index.html', label: 'Overview' },
		{ href: 'foundations.html', label: 'Foundations' },
		{ href: 'logo.html', label: 'Logo' },
		{ href: 'create.html', label: 'Create' },
		{ href: 'share.html', label: 'Share' },
		{ href: 'reveal.html', label: 'Reveal' },
		{ href: 'states.html', label: 'States' },
		{ href: 'landing-uk.html', label: 'Landing UK' },
		{ href: 'landing-en.html', label: 'Landing EN' },
	];

	/* ---------- palette (mirrors brand.css; used for SVG marks and exports) ---------- */
	const C = {
		light: { paper: '#FFFCF6', bg: '#F6F2EA', ink: '#211C16', navy: '#1F3352', wax: '#7A2E4A', emboss: '#FFFCF6' },
		dark: { paper: '#1E1A15', bg: '#15120E', ink: '#F0EADF', navy: '#A9C1E6', wax: '#C9607F', emboss: '#FFF6EE' },
		tile: { fill: '#1F3352', wax: '#C9607F', emboss: '#F6F2EA', ink: '#F6F2EA' },
	};

	/* ---------- logo marks (viewBox 0 0 64 64) ---------- */
	let uid = 0;
	function wax(cx, cy, r, amp, bumps) {
		const n = 96, pts = [];
		for (let i = 0; i < n; i++) {
			const t = (i / n) * Math.PI * 2;
			// soft, irregular wax edge: a few low bumps plus a slow wobble (not a gear)
			const rr = r + amp * 0.45 * Math.cos(Math.round(bumps / 2) * t + 0.4) + amp * 0.55 * Math.sin(3 * t + 0.7) + amp * 0.25 * Math.cos(5 * t + 1.9);
			pts.push((cx + rr * Math.cos(t)).toFixed(2) + ' ' + (cy + rr * Math.sin(t)).toFixed(2));
		}
		return 'M' + pts.join('L') + 'Z';
	}

	const MARKS = {
		broken: {
			name: 'S1 · Broken seal',
			uk: 'Зламана печатка',
			idea: 'The seal at the moment it breaks: one crack, two halves. It shows the product’s one irreversible event.',
			risk: 'A broken thing can read as "damaged". The halves must stay close and tidy.',
			svg(c, simple, intact) {
				if (intact) return `<path d="${wax(32, 32, 24, simple ? 0.9 : 1.3, 13)}" fill="${c.wax}"/>` + (simple ? '' : `<circle cx="32" cy="32" r="14.5" fill="none" stroke="${c.emboss}" stroke-opacity=".55" stroke-width="2"/>`);
				const id = 'ov' + (++uid);
				const crack = simple ? [[33, 0], [29, 26], [35, 38], [31, 64]] : [[34, 0], [29.5, 21], [35, 31], [28.5, 43], [33, 64]];
				const line = crack.map(p => p.join(' ')).join(' L');
				const left = `M0 0 L${line} L0 64Z`;
				const right = `M64 0 L${crack.map(p => p.join(' ')).join(' L')} L64 64Z`;
				const disc = wax(32, 32, 24, simple ? 0.9 : 1.3, 13);
				const ring = simple ? '' : `<circle cx="32" cy="32" r="14.5" fill="none" stroke="${c.emboss}" stroke-opacity=".55" stroke-width="2"/>`;
				const off = simple ? 2.6 : 1.8;
				return `<defs><clipPath id="${id}l"><path d="${left}"/></clipPath><clipPath id="${id}r"><path d="${right}"/></clipPath></defs>` +
					`<g clip-path="url(#${id}l)" transform="translate(${-off} ${off * 0.3}) rotate(-3 32 32)"><path d="${disc}" fill="${c.wax}"/>${ring}</g>` +
					`<g clip-path="url(#${id}r)" transform="translate(${off} ${-off * 0.3}) rotate(3 32 32)"><path d="${disc}" fill="${c.wax}"/>${ring}</g>`;
			},
		},
		envelope: {
			name: 'S2 · Sealed envelope',
			uk: 'Запечатаний конверт',
			idea: 'The envelope is the link, the seal is the passphrase. The most literal mark, readable even as a 16 px favicon.',
			risk: 'Envelopes mean "email" to many people. The wax seal has to carry the difference.',
			svg(c, simple) {
				const w = simple ? 5 : 3.2;
				return `<rect x="6" y="14" width="52" height="37" rx="5" fill="none" stroke="${c.ink}" stroke-width="${w}" stroke-linejoin="round"/>` +
					`<path d="M8 17 L32 36 L56 17" fill="none" stroke="${c.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>` +
					`<path d="${wax(32, 36, simple ? 11 : 9.5, simple ? 0.5 : 0.8, 11)}" fill="${c.wax}"/>` +
					(simple ? '' : `<circle cx="32" cy="36" r="5" fill="none" stroke="${c.emboss}" stroke-opacity=".6" stroke-width="1.5"/>`);
			},
		},
		signet: {
			name: 'S3 · OV signet',
			uk: 'Перстень OV',
			idea: 'A signet seal pressed with an interlaced O and V. A monogram that works as the app icon and as a wax stamp on the landing.',
			risk: 'Monograms are generic unless drawn carefully. It needs a type designer’s pass before it ships.',
			svg(c, simple) {
				const w = simple ? 4.2 : 3.2;
				return `<path d="${wax(32, 32, 26, simple ? 0.9 : 1.4, 14)}" fill="${c.wax}"/>` +
					(simple ? '' : `<circle cx="32" cy="32" r="20" fill="none" stroke="${c.emboss}" stroke-opacity=".35" stroke-width="1.2"/>`) +
					`<circle cx="32" cy="31" r="${simple ? 12.5 : 11.5}" fill="none" stroke="${c.emboss}" stroke-width="${w}"/>` +
					`<path d="M${simple ? 22 : 23} 20 L32 ${simple ? 46 : 45} L${simple ? 42 : 41} 20" fill="none" stroke="${c.emboss}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
			},
		},
		one: {
			name: 'S4 · Seal of one',
			uk: 'Печатка «1»',
			idea: 'A wax seal stamped with the numeral 1: one reader, one opening. "One" from the name becomes the emblem.',
			risk: 'A "1" can read as a notification badge or a ranking. The wax edge and serif foot avoid that.',
			svg(c, simple) {
				const w = simple ? 5 : 4;
				return `<path d="${wax(32, 32, 26, simple ? 0.9 : 1.4, 14)}" fill="${c.wax}"/>` +
					(simple ? '' : `<circle cx="32" cy="32" r="19.5" fill="none" stroke="${c.emboss}" stroke-opacity=".45" stroke-width="1.4"/>`) +
					`<path d="M27 ${simple ? 25 : 24} L33.5 19 V44" fill="none" stroke="${c.emboss}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` +
					`<path d="M26 44.5 H41" fill="none" stroke="${c.emboss}" stroke-width="${w}" stroke-linecap="round"/>`;
			},
		},
		drop: {
			name: 'S5 · Wax drop',
			uk: 'Крапля воску',
			idea: 'One drop of wax, before it is pressed. Quiet and abstract. It lets the wordmark do the talking.',
			risk: 'Without context it may read as a pin, a blood drop or a map marker. It’s the weakest on its own.',
			svg(c, simple) {
				const drip = 'M37.5 41 C40.5 46 42.5 50.5 41 54.5 C39.6 58.3 34.4 58.2 34 54.4 C33.6 50.8 36.2 47.6 35.4 42.5 Z';
				return `<path d="${wax(31, 27, 19, simple ? 0.5 : 0.9, 9)}" fill="${c.wax}"/><path d="${drip}" fill="${c.wax}"/>` +
					(simple ? '' : `<path d="M21 22 A12 12 0 0 1 29 14.5" fill="none" stroke="${c.emboss}" stroke-opacity=".55" stroke-width="2.4" stroke-linecap="round"/>`);
			},
		},
	};

	function markSVG(key, mode, size, simple, intact) {
		const c = mode === 'tile' ? C.tile : C[mode] || C.light;
		return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">${MARKS[key].svg(c, simple, intact)}</svg>`;
	}
	function iconSVG(key, size, simple) {
		const inner = MARKS[key].svg(C.tile, simple);
		const s = simple ? 0.8 : 0.72, o = (64 - 64 * s) / 2;
		return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="${simple ? 12 : 14}" fill="${C.tile.fill}"/><g transform="translate(${o} ${o}) scale(${s})">${inner}</g></svg>`;
	}

	/* node: export for asset generation */
	if (typeof document === 'undefined') {
		if (typeof module !== 'undefined') module.exports = { MARKS, markSVG, iconSVG, C };
		return;
	}

	/* ---------- preferences ---------- */
	const store = {
		get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
		set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
	};
	let lang = store.get('ovb-lang', 'uk');
	let theme = store.get('ovb-theme', 'system');
	function applyTheme() {
		if (theme === 'system') document.documentElement.removeAttribute('data-theme');
		else document.documentElement.setAttribute('data-theme', theme);
	}
	applyTheme();

	/* ---------- sample copy (uk / en) ---------- */
	const T = {
		secretText: ['Secret text', 'Текст секрету'],
		secretPh: ['Paste a password, key or note', 'Вставте пароль, ключ чи нотатку'],
		secretHelp: ['Encrypted in this browser before it is sent.', 'Шифрується в цьому браузері ще до надсилання.'],
		over: ['10 214 / 10 000: shorten the text by 214 characters.', '10 214 / 10 000: скоротіть текст на 214 символів.'],
		passphrase: ['Passphrase', 'Парольна фраза'],
		passHelp: ['Send it separately. It is not in the link and we never store it.', 'Надішліть її окремо. У посиланні її немає, і ми її не зберігаємо.'],
		show: ['Show', 'Показати'], hide: ['Hide', 'Сховати'], generate: ['Generate', 'Згенерувати'],
		strength: ['Strength', 'Надійність'], strong: ['Strong', 'Надійна'], fair: ['Fair', 'Середня'], weak: ['Weak', 'Слабка'],
		expires: ['Expires in', 'Спливає через'], custom: ['Custom…', 'Інша дата…'],
		expiresAt: ['Link stops working on 25 Nov, 14:00.', 'Посилання перестане працювати 25 листопада о 14:00.'],
		oneTime: ['Delete after the first opening', 'Видалити після першого відкриття'],
		oneTimeHelp: ['Opening the link deletes the secret, even before it expires.', 'Відкриття посилання видаляє секрет, навіть до кінця терміну.'],
		create: ['Seal and create link', 'Запечатати й створити посилання'], creating: ['Sealing…', 'Запечатуємо…'],
		copy: ['Copy link', 'Копіювати'], copied: ['Copied', 'Скопійовано'],
		attach: ['Attach a file', 'Додати файл'], attachHelp: ['up to 5 MB, encrypted the same way', 'до 5 МБ, шифрується так само'],
		fileName: ['Encrypted the same way, file name included.', 'Шифрується так само, разом із назвою файлу.'],
		remove: ['Remove', 'Прибрати'],
		aInfoT: ['Send the passphrase separately.', 'Парольну фразу надішліть окремо.'], aInfo: ['It isn’t in the link. Use a different chat, a call or SMS.', 'Її немає в посиланні. Скористайтеся іншим чатом, дзвінком чи SMS.'],
		aOkT: ['Link ready.', 'Посилання готове.'], aOk: ['One-time, expires 25 Nov, 14:00.', 'Одноразове, спливає 25 листопада о 14:00.'],
		aWarnT: ['3 attempts left.', 'Залишилося 3 спроби.'], aWarn: ['After 5 wrong passphrases the secret is deleted.', 'Після 5 хибних парольних фраз секрет буде видалено.'],
		aDangerT: ['The seal is broken.', 'Печатку зламано.'], aDanger: ['This secret was opened and deleted.', 'Секрет уже відкрили й видалили.'],
		toast: ['Link copied. Now send the passphrase another way.', 'Посилання скопійовано. Тепер надішліть парольну фразу іншим шляхом.'],
		dlgT: ['Open this secret now?', 'Відкрити секрет зараз?'],
		dlg: ['It can be opened once. Opening breaks the seal and deletes it from the server, so have somewhere ready to save it.', 'Його можна відкрити лише раз. Відкриття зламає печатку й видалить його із сервера, тож підготуйте, куди зберегти.'],
		dlgOk: ['Break the seal', 'Зламати печатку'], cancel: ['Not now', 'Не зараз'],
		delete: ['Delete secret', 'Видалити секрет'],
		primary: ['Primary', 'Основна'], secondary: ['Secondary', 'Другорядна'], ghost: ['Ghost', 'Прозора'], danger: ['Danger', 'Небезпечна'],
	};
	const t = (k) => (T[k] ? T[k][lang === 'en' ? 0 : 1] : k);
	const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

	/* ---------- icons (lucide-style, 1.75 stroke) ---------- */
	const ICON = {
		info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
		check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
		alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
		x: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
		copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
		file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
		eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
	};
	const icon = (n, s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

	/* ---------- contrast ---------- */
	function lum(hex) {
		const h = hex.trim().replace('#', '');
		const v = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
		return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
	}
	function ratio(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
	const PAIRS = [
		['text', 'bg', 4.5], ['text', 'surface', 4.5], ['text', 'surface-raised', 4.5], ['text', 'surface-sunken', 4.5],
		['muted', 'bg', 4.5], ['muted', 'surface', 4.5], ['muted', 'surface-raised', 4.5], ['muted', 'surface-sunken', 4.5],
		['primary', 'bg', 4.5], ['primary', 'surface-raised', 4.5], ['on-primary', 'primary', 4.5], ['on-primary', 'primary-hover', 4.5],
		['accent', 'surface', 4.5], ['success', 'surface', 4.5], ['success', 'surface-sunken', 4.5],
		['warning', 'surface', 4.5], ['danger', 'surface', 4.5], ['danger', 'surface-raised', 4.5], ['on-danger', 'danger', 4.5],
		['bg', 'text', 4.5, 'toast'],
		['border-strong', 'surface-raised', 3, 'non-text'], ['focus', 'bg', 3, 'non-text'], ['seal', 'bg', 3, 'non-text'],
	];
	const ROLES = ['bg', 'surface', 'surface-raised', 'surface-sunken', 'border', 'border-strong', 'text', 'muted', 'primary', 'primary-hover', 'on-primary', 'accent', 'success', 'warning', 'danger', 'on-danger', 'seal', 'focus'];
	const cssVar = (el, r) => getComputedStyle(el).getPropertyValue('--color-' + r).trim();

	/* ---------- renderers ---------- */
	const R = {};

	R.nav = (el) => {
		const here = location.pathname.split('/').pop() || 'index.html';
		el.className = 'site-nav';
		el.setAttribute('aria-label', 'OneVello brand');
		el.innerHTML = `<a class="brand" href="index.html">${markSVG(window.OV_MARK || 'broken', 'light', 26)}OneVello brand</a>
			<div class="links">${PAGES.map(p => p.soon ? `<span title="Next group">${p.label}</span>` : `<a href="${p.href}"${p.href === here ? ' aria-current="page"' : ''}>${p.label}</a>`).join('')}</div>
			<div class="tools">
				<div class="seg" role="group" aria-label="Theme">${['system', 'light', 'dark'].map(v => `<button type="button" data-theme-set="${v}" aria-pressed="${theme === v}">${v === 'system' ? 'Auto' : v === 'light' ? 'Light' : 'Dark'}</button>`).join('')}</div>
				<div class="seg" role="group" aria-label="Sample copy language">${['uk', 'en'].map(v => `<button type="button" data-lang-set="${v}" aria-pressed="${lang === v}">${v.toUpperCase()}</button>`).join('')}</div>
			</div>`;
	};

	R.swatches = (el) => {
		el.innerHTML = ['light', 'dark'].map(m => `<div class="panel theme-${m}" data-panel="${m}"><span class="label">${m}</span><div class="swatches">${ROLES.map(r => `<div class="swatch"><i style="background:var(--color-${r})"></i><b>--color-${r}</b><span data-hex="${r}"></span></div>`).join('')}</div></div>`).join('');
		el.querySelectorAll('[data-panel]').forEach(p => p.querySelectorAll('[data-hex]').forEach(s => { s.textContent = cssVar(p, s.dataset.hex).toUpperCase(); }));
	};

	R.contrast = (el) => {
		const probe = (m) => { const d = document.createElement('div'); d.className = 'theme-' + m; d.hidden = true; document.body.appendChild(d); return d; };
		const L = probe('light'), D = probe('dark');
		const rows = PAIRS.map(([fg, bg, min, note]) => {
			const a = ratio(cssVar(L, fg), cssVar(L, bg)), b = ratio(cssVar(D, fg), cssVar(D, bg));
			const tag = (v) => `<span class="pass-tag${v >= min ? '' : ' fail'}">${v >= min ? 'AA' : 'fail'}</span>`;
			return `<tr><td><code>${fg}</code> on <code>${bg}</code>${note ? ` <span class="muted">(${note})</span>` : ''}</td><td class="num">${min}:1</td><td class="num">${a.toFixed(2)} ${tag(a)}</td><td class="num">${b.toFixed(2)} ${tag(b)}</td></tr>`;
		}).join('');
		L.remove(); D.remove();
		el.innerHTML = `<div class="tablebox"><table class="data"><thead><tr><th>Pair</th><th>Minimum</th><th>Light</th><th>Dark</th></tr></thead><tbody>${rows}</tbody></table></div>`;
	};

	R.type = (el) => {
		const rows = [
			['64 / 72 · 600', 'heading', 64, 72, 'Share once.'],
			['48 / 56 · 600', 'heading', 48, 56, 'Надішліть раз.'],
			['32 / 40 · 600', 'heading', 32, 40, 'Trust always. Довіряйте завжди.'],
			['24 / 32 · 600', 'heading', 24, 32, 'Посилання готове · Link ready'],
			['18 / 28 · 400', 'body', 18, 28, 'Без парольної фрази посилання нічого не відкриє.'],
			['16 / 24 · 400', 'body', 16, 24, 'Текст шифрується в цьому браузері ще до надсилання. Text is encrypted in this browser before it is sent.'],
			['14 / 20 · 500', 'body', 14, 20, 'Одноразове · спливає 25 листопада о 14:00'],
			['12 / 16 · 400', 'body', 12, 16, 'Файл шифрується так само, разом із назвою.'],
			['mono 15 · 500', 'mono', 15, 22, 'onevello.example/secret/Xk7Q m2pL r9vT'],
			['mono 16 · 500', 'mono', 16, 24, 'mK4#tr9-Lq2v · 3/5 · 10 000'],
		];
		el.innerHTML = `<div class="specimen">${rows.map(r => `<div class="row"><span>${r[0]}</span><span style="font:${r[1] === 'heading' ? 600 : r[1] === 'mono' ? 500 : r[0].includes('500') ? 500 : 400} ${r[2]}px/${r[3]}px var(--font-${r[1]});${r[1] === 'heading' ? 'letter-spacing:-.01em' : ''}">${esc(r[4])}</span></div>`).join('')}</div>
			<p class="muted" style="font-size:14px;max-width:72ch">Source Serif 4 only from 20 px up: wordmark, page and card titles, landing headings. Never in inputs, buttons, chips or alerts. IBM Plex Mono for every value the user reads back or copies: the link, the passphrase, counters, sizes, dates in chips. All three families are OFL with full Cyrillic; in the app they are self-hosted with <code>@fontsource</code>.</p>`;
	};

	function buttons() {
		const kinds = [['primary', 'create'], ['secondary', 'copy'], ['ghost', 'cancel'], ['danger', 'delete']];
		const states = [['', 'default'], ['is-hover', 'hover'], ['is-focus', 'focus'], ['is-active', 'active'], ['is-disabled', 'disabled'], ['is-loading', 'loading']];
		return `<div class="ov-stack">${kinds.map(([k, label]) => `<div class="ov-stack" style="gap:6px"><span class="label">${t(k)}</span><div class="ov-row">${states.map(([cls, s]) => `<button type="button" class="ov-btn ov-btn--${k} ${cls}" title="${s}"${cls === 'is-disabled' ? ' disabled' : ''}${cls === 'is-loading' ? ' aria-busy="true"' : ''}>${cls === 'is-loading' ? `<span class="ov-spinner"></span>${k === 'primary' ? t('creating') : '…'}` : t(label)}</button>`).join('')}</div></div>`).join('')}
			<p class="ov-help">default · hover · focus-visible · active · disabled · loading. Min height 44 px.</p></div>`;
	}

	function components(m) {
		const n = m; // id suffix
		return `<div class="ov-stack" style="gap:20px">
			${buttons()}
			<div class="ov-field"><label for="tx-${n}">${t('secretText')}</label><textarea id="tx-${n}" class="ov-textarea" rows="4" placeholder="${esc(t('secretPh'))}" aria-describedby="txh-${n}">DB_PASSWORD=mK4#tr9-Lq2v</textarea><div class="ov-row" style="justify-content:space-between"><span id="txh-${n}" class="ov-help">${t('secretHelp')}</span><span class="ov-counter">24 / 10 000</span></div></div>
			<div class="ov-field"><label for="txe-${n}">${t('secretText')} <span class="muted" style="font-weight:400">(error)</span></label><input id="txe-${n}" class="ov-input" aria-invalid="true" aria-describedby="txee-${n}" value="…"><span id="txee-${n}" class="ov-error">${t('over')}</span></div>
			<div class="ov-field"><label for="ps-${n}">${t('passphrase')}</label>
				<div class="ov-pass"><input id="ps-${n}" type="password" value="mK4#tr9-Lq2v" autocomplete="off" aria-describedby="psh-${n}"><button type="button" data-reveal="ps-${n}" aria-controls="ps-${n}" aria-pressed="false">${t('show')}</button><button type="button">${t('generate')}</button></div>
				<div class="ov-meter" data-level="3" aria-hidden="true"><i></i><i></i><i></i></div>
				<div class="ov-meter-label"><span id="psh-${n}">${t('passHelp')}</span><span>${t('strength')}: <b>${t('strong')}</b></span></div></div>
			<div class="ov-field"><span class="ov-label" id="ex-${n}">${t('expires')}</span><div class="ov-presets" role="group" aria-labelledby="ex-${n}">${['1h', '24h', '7d', '30d'].map(p => `<button type="button" class="ov-preset" aria-pressed="${p === '24h'}">${p}</button>`).join('')}<button type="button" class="ov-preset" aria-pressed="false" style="font-family:var(--font-body)">${t('custom')}</button></div><span class="ov-help">${t('expiresAt')}</span></div>
			<label class="ov-switch"><input type="checkbox" checked><span class="track"></span><span class="text"><b>${t('oneTime')}</b><span>${t('oneTimeHelp')}</span></span></label>
			<div class="ov-drop">${icon('file', 22)}<span><b>${t('attach')}</b> · ${t('attachHelp')}</span></div>
			<div class="ov-drop is-filled">${icon('file', 22)}<span class="ov-stack" style="gap:2px;flex:1;min-width:0"><span class="file">contract-2026.pdf · 1.8 MB</span><span class="ov-help">${t('fileName')}</span></span><button type="button" class="ov-btn ov-btn--ghost">${t('remove')}</button></div>
			<div class="ov-field"><span class="ov-label">Link</span><div class="ov-copy"><output><span class="host">onevello.example/secret/</span><span class="grp">Xk7Q</span><span class="grp">m2pL</span><span class="grp">r9vT</span></output><button type="button" class="ov-btn ov-btn--primary" data-copy>${icon('copy', 16)}${t('copy')}</button></div>
				<div class="ov-copy"><output><span class="host">onevello.example/secret/</span><span class="grp">Xk7Q</span><span class="grp">m2pL</span><span class="grp">r9vT</span></output><button type="button" class="ov-btn ov-btn--secondary is-copied">${icon('check', 16)}${t('copied')}</button></div></div>
			<div class="ov-chips"><span class="ov-chip">${lang === 'en' ? 'One-time' : 'Одноразовий'}</span><span class="ov-chip">${lang === 'en' ? 'Expires' : 'Спливає'} <span class="mono">25.11 14:00</span></span><span class="ov-chip">${lang === 'en' ? 'Attempts' : 'Спроби'} <span class="mono">2/5</span></span></div>
			<div class="ov-alert ov-alert--info" role="note">${icon('info')}<span><b>${t('aInfoT')}</b> ${t('aInfo')}</span></div>
			<div class="ov-alert ov-alert--success" role="status">${icon('check')}<span><b>${t('aOkT')}</b> ${t('aOk')}</span></div>
			<div class="ov-alert ov-alert--warning" role="alert">${icon('alert')}<span><b>${t('aWarnT')}</b> ${t('aWarn')}</span></div>
			<div class="ov-alert ov-alert--danger">${icon('x')}<span><b>${t('aDangerT')}</b> ${t('aDanger')}</span></div>
			<div><div class="ov-toast" role="status" aria-live="polite">${icon('check')}${t('toast')}</div></div>
			<div class="ov-dialog-demo"><div class="ov-dialog" role="dialog" aria-modal="true" aria-labelledby="dl-${n}"><h3 id="dl-${n}">${t('dlgT')}</h3><p>${t('dlg')}</p><div class="actions"><button type="button" class="ov-btn ov-btn--ghost">${t('cancel')}</button><button type="button" class="ov-btn ov-btn--primary">${t('dlgOk')}</button></div></div></div>
			<div class="ov-skeleton" aria-hidden="true"><i style="width:40%"></i><i style="width:90%"></i><i style="width:70%"></i></div>
		</div>`;
	}

	R.components = (el) => {
		el.innerHTML = ['light', 'dark'].map(m => `<div class="panel theme-${m}"><span class="label">${m}</span>${components(m)}</div>`).join('');
	};

	R.logos = (el) => {
		el.innerHTML = Object.keys(MARKS).filter(k => k !== el.dataset.except).map(k => {
			const mk = MARKS[k];
			return `<article class="concept" id="${k}">
				<header><h3>${mk.name}</h3><span class="muted" style="font-size:14px">${mk.uk}</span></header>
				<div class="hero-mark">${markSVG(k, document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light', 120)}</div>
				<div class="sizes">
					<figure>${iconSVG(k, 96)}<figcaption>app icon 96</figcaption></figure>
					<figure>${iconSVG(k, 48)}<figcaption>48</figcaption></figure>
					<figure>${iconSVG(k, 32, true)}<figcaption>32 simple</figcaption></figure>
					<figure>${iconSVG(k, 16, true)}<figcaption>16</figcaption></figure>
					<figure>${markSVG(k, 'light', 16, true)}<figcaption>favicon</figcaption></figure>
				</div>
				<div class="lockups">
					<div class="lockup on-light">${markSVG(k, 'light', 40)}<span class="wordmark">OneVello</span></div>
					<div class="lockup on-dark">${markSVG(k, 'dark', 40)}<span class="wordmark">OneVello</span></div>
					<div class="lockup on-light">${markSVG(k, 'light', 32, true)}<span class="wordmark sans" style="font-size:24px">OneVello</span><span class="muted" style="font-size:12px;color:#5e5548">sans</span></div>
				</div>
				<div class="favicon-row"><span class="tab-mock">${markSVG(k, 'light', 16, true)}OneVello</span><span class="tab-mock theme-dark" style="background:#0f0d0a;color:#f0eadf;border-color:#383126">${markSVG(k, 'dark', 16, true)}OneVello</span></div>
				<p><b style="color:var(--color-text)">Idea.</b> ${esc(mk.idea)}</p>
				<p><b style="color:var(--color-text)">Risk.</b> ${esc(mk.risk)}</p>
			</article>`;
		}).join('');
	};

	/* ---------- screens ---------- */
	const S = {
		nav: [['How it works', 'Як це працює'], ['My secrets', 'Мої секрети']],
		foot: [['Open source · Security · Privacy · Terms', 'Відкритий код · Безпека · Приватність · Умови'], ['Share once. Trust always.', 'Надішліть раз. Довіряйте завжди.']],
		newT: ['New secret', 'Новий секрет'],
		newP: ['The text and file are encrypted in this browser. You send the link and the passphrase separately.', 'Текст і файл шифруються в цьому браузері. Посилання й парольну фразу ви надішлете окремо.'],
		sealing: ['Sealing in this browser…', 'Запечатуємо в цьому браузері…'],
		readyT: ['Link ready', 'Посилання готове'],
		readyP: ['Copy the link and send it. The passphrase goes another way.', 'Скопіюйте посилання й надішліть. Парольна фраза — іншим шляхом.'],
		nextT: ['What happens next', 'Що далі'],
		n1: ['Send the link', 'Надішліть посилання'], n1d: ['Any chat or email. The link alone opens nothing.', 'Будь-яким чатом чи поштою. Саме посилання нічого не відкриє.'],
		n2: ['Send the passphrase another way', 'Парольну фразу — іншим шляхом'], n2d: ['A call, SMS or a different messenger. Never in the same message.', 'Дзвінком, SMS чи в іншому месенджері. Ніколи в тому самому повідомленні.'],
		n3: ['The first opening breaks the seal', 'Перше відкриття зламає печатку'], n3d: ['The secret is deleted when the link is opened. If nobody opens it, the link stops working on 25 Nov at 14:00.', 'Секрет видаляється, щойно посилання відкриють. Якщо ніхто не відкриє, посилання перестане працювати 25 листопада о 14:00.'],
		another: ['Create another', 'Створити ще'], mine: ['My secrets', 'Мої секрети'],
		gotT: ['You were sent a secret', 'Вам надіслали секрет'],
		gotP: ['It is sealed. Nothing has been opened or deleted yet.', 'Його запечатано. Ще нічого не відкрито й не видалено.'],
		gotBtn: ['Break the seal and open', 'Зламати печатку й відкрити'],
		passT: ['Enter the passphrase', 'Введіть парольну фразу'],
		passP: ['The sender gave it to you separately. It is not part of the link.', 'Відправник передав її окремо. Вона не є частиною посилання.'],
		open: ['Open', 'Відкрити'],
		wrong: ['The passphrase doesn’t match. 3 attempts left, then the secret is deleted.', 'Парольна фраза не збігається. Залишилося 3 спроби, потім секрет буде видалено.'],
		revT: ['The seal is broken', 'Печатку зламано'],
		revP: ['This secret is no longer on the server. It exists only on this page: copy what you need before you close it.', 'Цього секрету вже немає на сервері. Він є лише на цій сторінці: скопіюйте потрібне, перш ніж закрити.'],
		copyText: ['Copy text', 'Копіювати текст'],
		dl: ['Download, once', 'Завантажити (лише раз)'],
		dlNote: ['The file is deleted after the first download.', 'Файл видаляється після першого завантаження.'],
		createOwn: ['Create your own secret', 'Створити свій секрет'],
		home: ['Home', 'На головну'], retry: ['Try again', 'Спробувати ще'],
		burnT: ['The seal is broken', 'Печатку зламано'], burnP: ['This secret was already opened and deleted. If it wasn’t you, tell the sender: someone else may have opened the link.', 'Цей секрет уже відкрили й видалили. Якщо це були не ви, повідомте відправника: посилання міг відкрити хтось інший.'],
		expT: ['This link has expired', 'Термін дії посилання минув'], expP: ['The secret was not opened in time and is deleted. Ask the sender for a new link.', 'Секрет не відкрили вчасно, і його видалено. Попросіть відправника про нове посилання.'],
		lockT: ['Too many attempts', 'Забагато спроб'], lockP: ['After 5 wrong passphrases the secret was deleted. Ask the sender to create a new one and send the passphrase again.', 'Після 5 хибних парольних фраз секрет видалено. Попросіть відправника створити новий і ще раз передати парольну фразу.'],
		nfT: ['Secret not found', 'Секрет не знайдено'], nfP: ['It may have been opened or expired, or the link was copied incompletely. Check it against the one you were sent.', 'Його могли вже відкрити, термін міг минути, або посилання скопійовано не повністю. Звірте його з тим, що вам надіслали.'],
		offT: ['Couldn’t load the secret', 'Не вдалося завантажити секрет'], offP: ['Check your connection and try again. Nothing was opened or deleted.', 'Перевірте з’єднання й спробуйте ще раз. Нічого не відкрито й не видалено.'],
		sample: 'Wi-Fi: Office-5G\nPassword: tr9-Lq2v-mK4#\n\nVPN key in the attached file.',
	};
	const s = (k) => (S[k] ? S[k][lang === 'en' ? 0 : 1] : k);
	const sealImg = (mode, size, intact) => markSVG('broken', mode, size, size <= 32, intact);

	function shell(mode, mobile, body) {
		const head = mobile
			? `<header class="app-head"><span class="logo">${sealImg(mode, 28)}OneVello</span><span class="pill">${lang.toUpperCase()}</span></header>`
			: `<header class="app-head"><span class="logo">${sealImg(mode, 32)}OneVello</span><nav><span>${L(S.nav[0])}</span><span>${L(S.nav[1])}</span><span class="pill">${lang.toUpperCase()}</span><span class="pill">${mode === 'dark' ? '☾' : '☀'}</span></nav></header>`;
		return `<div class="app${mobile ? ' is-mobile' : ''}">${head}<main class="app-main">${body}</main><footer class="app-foot"><span>${L(S.foot[0])}</span><span>${L(S.foot[1])}</span></footer></div>`;
	}
	const L = (pair) => pair[lang === 'en' ? 0 : 1];
	const title = (h, p) => `<div class="app-title"><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div>`;
	const linkField = (copied) => `<div class="ov-copy"><output><span class="host">onevello.example/secret/</span><span class="grp">Xk7Q</span><span class="grp">m2pL</span><span class="grp">r9vT</span></output>${copied ? `<button type="button" class="ov-btn ov-btn--secondary is-copied">${icon('check', 16)}${t('copied')}</button>` : `<button type="button" class="ov-btn ov-btn--primary" data-copy>${icon('copy', 16)}${t('copy')}</button>`}</div>`;
	const chips = (extra) => `<div class="ov-chips"><span class="ov-chip">${lang === 'en' ? 'One-time' : 'Одноразовий'}</span><span class="ov-chip">${lang === 'en' ? 'Expires' : 'Спливає'} <span class="mono">25.11 14:00</span></span>${extra || ''}</div>`;
	const fileChip = `<span class="ov-chip">${icon('file', 14)}<span class="mono">contract-2026.pdf · 1.8 MB</span></span>`;

	const SCREENS = {
		compose(mode, m, v) {
			const sealing = v === 'sealing';
			return `<div class="col">${title(s('newT'), s('newP'))}
				<div class="ov-card${sealing ? ' is-sealing' : ''}">
					<div class="ov-field"><label>${t('secretText')}</label><textarea class="ov-textarea" rows="${m ? 4 : 5}">${esc(S.sample)}</textarea><div class="ov-row" style="justify-content:space-between"><span class="ov-help">${t('secretHelp')}</span><span class="ov-counter">58 / 10 000</span></div></div>
					<div class="ov-drop is-filled">${icon('file', 22)}<span class="ov-stack" style="gap:2px;flex:1;min-width:0"><span class="file">vpn-office.conf · 2 KB</span><span class="ov-help">${t('fileName')}</span></span>${m ? '' : `<button type="button" class="ov-btn ov-btn--ghost">${t('remove')}</button>`}</div>
					<div class="split">
						<div class="ov-field"><label>${t('passphrase')}</label><div class="ov-pass"><input type="password" value="mK4#tr9-Lq2v" readonly><button type="button">${t('show')}</button><button type="button">${t('generate')}</button></div><div class="ov-meter" data-level="3"><i></i><i></i><i></i></div><div class="ov-meter-label"><span>${t('strength')}</span><b>${t('strong')}</b></div></div>
						<div class="ov-field"><span class="ov-label">${t('expires')}</span><div class="ov-presets">${['1h', '24h', '7d', '30d'].map(p => `<button type="button" class="ov-preset" aria-pressed="${p === '24h'}">${p}</button>`).join('')}</div><span class="ov-help">${t('expiresAt')}</span></div>
					</div>
					<label class="ov-switch"><input type="checkbox" checked><span class="track"></span><span class="text"><b>${t('oneTime')}</b><span>${t('oneTimeHelp')}</span></span></label>
					<button type="button" class="ov-btn ov-btn--primary ov-btn--block"${sealing ? ' aria-busy="true"' : ''}>${sealing ? `<span class="ov-spinner"></span>${t('creating')}` : t('create')}</button>
					${sealing ? `<div class="sealing-veil" aria-live="polite"><div>${sealImg(mode, 64, true)}<span>${s('sealing')}</span></div></div>` : ''}
				</div></div>`;
		},
		error(mode, m) {
			return `<div class="col">${title(s('newT'))}<div class="ov-card">
				<div class="ov-field"><label>${t('secretText')}</label><textarea class="ov-textarea" rows="4" aria-invalid="true">${esc(S.sample)}…</textarea><div class="ov-row" style="justify-content:space-between"><span class="ov-error">${t('over')}</span><span class="ov-counter is-over">10 214 / 10 000</span></div></div>
				<div class="ov-alert ov-alert--danger">${icon('x')}<span><b>${lang === 'en' ? 'Couldn’t create the link.' : 'Не вдалося створити посилання.'}</b> ${lang === 'en' ? 'Check the connection and try again. Nothing was saved.' : 'Перевірте з’єднання й спробуйте ще раз. Нічого не збережено.'}</span></div>
				<button type="button" class="ov-btn ov-btn--primary ov-btn--block">${t('create')}</button></div></div>`;
		},
		share(mode, m, v) {
			const copied = v === 'copied';
			return `<div class="col">${title(s('readyT'), s('readyP'))}
				<div class="ov-card">${linkField(copied)}${chips(fileChip)}
					<div class="ov-alert ov-alert--info">${icon('info')}<span><b>${t('aInfoT')}</b> ${t('aInfo')}</span></div>
					<div class="ov-stack" style="gap:12px"><span class="label">${s('nextT')}</span><ol class="steps">
						<li><span>1</span><span><b>${s('n1')}</b><span class="d">${s('n1d')}</span></span></li>
						<li><span>2</span><span><b>${s('n2')}</b><span class="d">${s('n2d')}</span></span></li>
						<li><span>3</span><span><b>${s('n3')}</b><span class="d">${s('n3d')}</span></span></li></ol></div>
					<div class="ov-row"><button type="button" class="ov-btn ov-btn--secondary${m ? ' ov-btn--block' : ''}">${s('another')}</button>${m ? '' : `<button type="button" class="ov-btn ov-btn--ghost">${s('mine')}</button>`}</div>
				</div>
				${copied ? `<div style="display:flex;justify-content:center"><div class="ov-toast" role="status">${icon('check')}${t('toast')}</div></div>` : ''}</div>`;
		},
		gate(mode, m) {
			return `<div class="col"><div class="ov-card"><div class="center">${sealImg(mode, m ? 72 : 96, true)}
				<h3>${s('gotT')}</h3><p>${s('gotP')}</p></div>
				${chips(`<span class="ov-chip">${icon('file', 14)}${lang === 'en' ? 'File attached' : 'Є файл'}</span>`)}
				<div class="ov-alert ov-alert--warning">${icon('alert')}<span>${t('dlg')}</span></div>
				<button type="button" class="ov-btn ov-btn--primary ov-btn--block">${s('gotBtn')}</button></div></div>`;
		},
		pass(mode, m, v) {
			const wrong = v === 'wrong';
			return `<div class="col">${title(s('passT'), s('passP'))}<div class="ov-card">
				<div class="ov-field"><label>${t('passphrase')}</label><div class="ov-pass" ${wrong ? 'style="border-color:var(--color-danger)"' : ''}><input type="password" value="${wrong ? '' : 'mK4#tr9-Lq2v'}" placeholder="••••••••" readonly><button type="button">${t('show')}</button></div></div>
				${wrong ? `<div class="ov-alert ov-alert--danger" role="alert">${icon('x')}<span>${s('wrong')} <span class="mono">2/5</span></span></div>` : ''}
				<div class="ov-row" style="justify-content:space-between"><span class="ov-help">${lang === 'en' ? 'Attempts' : 'Спроби'} <span class="mono">${wrong ? '2/5' : '0/5'}</span></span></div>
				<button type="button" class="ov-btn ov-btn--primary ov-btn--block">${s('open')}</button></div></div>`;
		},
		revealed(mode, m) {
			return `<div class="col">${title(s('revT'))}<div class="ov-card">
				<div class="ov-alert ov-alert--info">${icon('info')}<span>${s('revP')}</span></div>
				<div class="secret-box">${esc(S.sample)}</div>
				<div class="ov-row"><button type="button" class="ov-btn ov-btn--primary${m ? ' ov-btn--block' : ''}" data-copy>${icon('copy', 16)}${s('copyText')}</button></div>
				<div class="ov-drop is-filled">${icon('file', 22)}<span class="ov-stack" style="gap:2px;flex:1;min-width:0"><span class="file">vpn-office.conf · 2 KB</span><span class="ov-help">${s('dlNote')}</span></span></div>
				<button type="button" class="ov-btn ov-btn--secondary${m ? ' ov-btn--block' : ''}">${s('dl')}</button>
				<a href="#" class="ov-btn ov-btn--ghost" style="align-self:flex-start">${s('createOwn')}</a></div></div>`;
		},
		gone(mode, m, v) {
			const map = { burned: ['burnT', 'burnP', 'broken'], expired: ['expT', 'expP', 'clock'], locked: ['lockT', 'lockP', 'broken'], notfound: ['nfT', 'nfP', 'q'], offline: ['offT', 'offP', 'wifi'] };
			const [h, p, kind] = map[v];
			const glyph = kind === 'broken' ? sealImg(mode, m ? 72 : 88)
				: `<svg width="${m ? 56 : 64}" height="${m ? 56 : 64}" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${kind === 'clock' ? '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' : kind === 'q' ? '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>' : '<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><path d="M12 19h.01"/><path d="M3 3l18 18"/>'}</svg>`;
			const actions = v === 'offline'
				? `<button type="button" class="ov-btn ov-btn--primary${m ? ' ov-btn--block' : ''}">${s('retry')}</button>`
				: `<button type="button" class="ov-btn ov-btn--primary${m ? ' ov-btn--block' : ''}">${s('createOwn')}</button><button type="button" class="ov-btn ov-btn--ghost${m ? ' ov-btn--block' : ''}">${s('home')}</button>`;
			return `<div class="col"><div class="ov-card is-empty"><div class="center"><div class="state-mark">${glyph}</div><h3>${s(h)}</h3><p>${s(p)}</p><div class="ov-row" style="justify-content:center;width:100%">${actions}</div></div></div></div>`;
		},
	};

	/* ---------- landing ---------- */
	const LP = {
		en: {
			nav: ['How it works', 'Security', 'FAQ', 'GitHub'], signIn: 'Sign in',
			h1: 'Share <em>once.</em><br>Trust always.',
			lead: 'Send a password, a key or a small file as a sealed link. The link opens nothing without the passphrase, and the passphrase travels another way.',
			cta: 'Create a secret link', how: 'How it works',
			facts: ['Encrypted in your browser', 'No account to send or open', 'Open source'],
			howT: 'How it works', howL: 'Three steps, and the order matters.',
			steps: [
				['Write and seal', 'Type the secret or attach a file up to 5 MB, choose a passphrase, an expiry and whether it opens once. It is encrypted in your browser: AES-256-GCM with a key derived from the passphrase (PBKDF2-SHA256, 600 000 rounds).'],
				['Send the link, then the passphrase', 'The link goes by chat or email. The passphrase goes another way: a call, SMS or a different messenger. Neither one opens the secret alone.'],
				['The first opening breaks the seal', 'A one-time secret is deleted from our server when it is opened. Others open until they expire. After 5 wrong passphrases the secret is deleted.'],
			],
			protT: 'What is protected, and what isn’t', protL: 'Every claim here is true in the code. The second list matters as much as the first.',
			yesT: 'Protected', yes: [
				'The text and the file contents are encrypted before they leave your browser. We store only ciphertext.',
				'The passphrase is not in the link, and we never store it.',
				'A one-time secret is deleted from the server when it is opened.',
				'An expired link stops working.',
				'5 wrong passphrases delete the secret.',
			],
			noT: 'Not protected', no: [
				'A weak or leaked passphrase. Anyone with the link can try passphrases offline, so use a long one.',
				'Whoever opens the link first. A forwarded link burns a one-time secret.',
				'After it is opened, the secret is in the recipient’s hands. We delete it from the server, but can’t stop them copying the text or taking a screenshot.',
				'Malware or a bad browser extension on either device.',
			],
			featT: 'What you get', feat: [
				['10 000', 'characters of text per secret'], ['5 MB', 'one file, encrypted the same way'], ['1h · 24h · 7d · 30d', 'or any date you pick'],
				['1 or ∞', 'opens once, or until it expires'], ['0', 'accounts needed to send or open'], ['uk · en', 'light and dark'],
			],
			featNote: 'Optional: sign in with Google to see your sent secrets as Waiting, Opened or Expired. The content stays encrypted either way.',
			faqT: 'Questions', faq: [
				['Can OneVello read my secret?', 'No. We store only ciphertext, and without the passphrase it can’t be decrypted. What else is stored next to it is listed in the Privacy Policy.'],
				['Why isn’t the passphrase in the link?', 'So that a leaked or forwarded link alone opens nothing. The cost is one extra step: the recipient types the passphrase.'],
				['How long should the passphrase be?', 'Longer is stronger: anyone who gets the link can try passphrases offline. Use 12+ characters or four random words. The generator gives a quick suggestion.'],
				['I lost the passphrase. Can you recover the secret?', 'No. Nobody can, including us. Create a new secret.'],
				['What happens when a link expires?', 'It stops working at once. The stored ciphertext is deleted the next time someone opens the link, or in a regular cleanup.'],
				['Do I need an account?', 'No, neither to send nor to open. Signing in with Google only adds a list of the secrets you sent.'],
			],
			ossT: 'Open source, open about security', ossL: 'The whole app, including the encryption, is on GitHub. If you find a weakness, write to us privately first.',
			oss: [['Source code', 'github.com/myk-d/onevello'], ['Security policy', 'SECURITY.md'], ['Report a vulnerability', 'security@myslennya.com']],
			finalT: 'Something to send right now?', finalBtn: 'Create a secret link',
			foot: ['How it works', 'Privacy', 'Terms', 'Security', 'GitHub'], copy: '© 2026 OneVello · support@myslennya.com',
		},
		uk: {
			nav: ['Як це працює', 'Безпека', 'Питання', 'GitHub'], signIn: 'Увійти',
			h1: 'Надішліть <em>раз.</em><br>Довіряйте завжди.',
			lead: 'Пароль, ключ чи невеликий файл — запечатаним посиланням. Без парольної фрази посилання нічого не відкриє, а парольна фраза йде іншим шляхом.',
			cta: 'Створити посилання', how: 'Як це працює',
			facts: ['Шифрування у вашому браузері', 'Без облікового запису', 'Відкритий код'],
			howT: 'Як це працює', howL: 'Три кроки, і порядок важливий.',
			steps: [
				['Напишіть і запечатайте', 'Введіть секрет або додайте файл до 5 МБ, оберіть парольну фразу, термін і чи відкривається він лише раз. Шифрування відбувається у вашому браузері: AES-256-GCM із ключем, отриманим з парольної фрази (PBKDF2-SHA256, 600 000 ітерацій).'],
				['Надішліть посилання, потім парольну фразу', 'Посилання — у чат чи поштою. Парольну фразу — іншим шляхом: дзвінком, SMS чи в іншому месенджері. Окремо жодне з них секрет не відкриє.'],
				['Перше відкриття зламає печатку', 'Одноразовий секрет видаляється із сервера, щойно його відкриють. Інші відкриваються до кінця терміну. Після 5 хибних парольних фраз секрет видаляється.'],
			],
			protT: 'Що захищено, а що ні', protL: 'Кожне твердження тут відповідає коду. Другий список так само важливий, як перший.',
			yesT: 'Захищено', yes: [
				'Текст і вміст файлу шифруються ще до того, як залишать ваш браузер. Ми зберігаємо лише шифротекст.',
				'Парольної фрази немає в посиланні, і ми її ніколи не зберігаємо.',
				'Одноразовий секрет видаляється із сервера, щойно його відкриють.',
				'Посилання з терміном, що минув, перестає працювати.',
				'Після 5 хибних парольних фраз секрет видаляється.',
			],
			noT: 'Не захищено', no: [
				'Слабка або викрадена парольна фраза. Хто має посилання, може підбирати її офлайн, тож обирайте довгу.',
				'Той, хто відкриє посилання першим. Переслане посилання спалює одноразовий секрет.',
				'Після відкриття секрет у руках одержувача. Ми видаляємо його із сервера, але не можемо завадити скопіювати текст чи зробити знімок екрана.',
				'Шкідливе програмне забезпечення чи небезпечне розширення браузера на будь-якому пристрої.',
			],
			featT: 'Що ви отримуєте', feat: [
				['10 000', 'символів тексту в одному секреті'], ['5 МБ', 'один файл, шифрується так само'], ['1 год · 24 год · 7 дн · 30 дн', 'або будь-яка дата'],
				['1 або ∞', 'відкривається раз або до кінця терміну'], ['0', 'облікових записів, щоб надіслати чи відкрити'], ['uk · en', 'світла й темна тема'],
			],
			featNote: 'За бажанням: увійдіть через Google, щоб бачити свої секрети зі статусами «Очікує», «Відкрито», «Прострочено». Вміст у будь-якому разі зашифровано.',
			faqT: 'Питання', faq: [
				['OneVello може прочитати мій секрет?', 'Ні. Ми зберігаємо лише шифротекст, а без парольної фрази його не розшифрувати. Що ще зберігається поруч із ним, описано в Політиці приватності.'],
				['Чому парольної фрази немає в посиланні?', 'Щоб саме посилання, навіть перехоплене чи переслане, нічого не відкривало. Ціна — один додатковий крок: одержувач вводить парольну фразу.'],
				['Якою довгою має бути парольна фраза?', 'Що довша, то надійніша: хто отримав посилання, може підбирати її офлайн. Беріть від 12 символів або чотири випадкові слова. Генератор дає швидку підказку.'],
				['Я загубив парольну фразу. Чи можна відновити секрет?', 'Ні. Цього не може ніхто, зокрема ми. Створіть новий секрет.'],
				['Що буде, коли термін мине?', 'Посилання одразу перестане працювати. Збережений шифротекст видаляється, коли хтось наступного разу відкриє посилання, або під час регулярного очищення.'],
				['Потрібен обліковий запис?', 'Ні, ані щоб надіслати, ані щоб відкрити. Вхід через Google лише додає список надісланих вами секретів.'],
			],
			ossT: 'Відкритий код і відкритість щодо безпеки', ossL: 'Увесь застосунок, разом із шифруванням, — на GitHub. Знайшли вразливість — спершу напишіть нам приватно.',
			oss: [['Вихідний код', 'github.com/myk-d/onevello'], ['Політика безпеки', 'SECURITY.md'], ['Повідомити про вразливість', 'security@myslennya.com']],
			finalT: 'Є що надіслати просто зараз?', finalBtn: 'Створити посилання',
			foot: ['Як це працює', 'Приватність', 'Умови', 'Безпека', 'GitHub'], copy: '© 2026 OneVello · support@myslennya.com',
		},
	};
	const ok = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
	const warnI = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>';

	function landing(mode, mobile, lg) {
		const c = LP[lg];
		const prevLang = lang; lang = lg; // sample components follow the landing language
		const card = `<div class="ov-card"><span class="label">${lg === 'en' ? 'Link ready' : 'Посилання готове'}</span>${linkField(false)}${chips()}<div class="ov-alert ov-alert--info">${icon('info')}<span><b>${t('aInfoT')}</b> ${t('aInfo')}</span></div></div>`;
		const html = `<div class="lp${mobile ? ' is-mobile' : ''}">
			<header class="lp-head"><div class="lp-in"><span class="logo" style="display:flex;align-items:center;gap:10px;font:600 ${mobile ? 20 : 24}px/1 var(--font-heading);letter-spacing:-.012em">${sealImg(mode, mobile ? 28 : 32)}OneVello</span><nav>${c.nav.map(n => `<span>${n}</span>`).join('')}<span class="pill" style="font:600 12px var(--font-body);padding:6px 10px;border-radius:999px;border:1px solid var(--color-border);color:var(--color-text)">${lg.toUpperCase()}</span></nav></div></header>
			<section class="lp-hero"><div class="lp-in"><div><h1>${c.h1}</h1><p class="lead">${c.lead}</p><div class="cta"><button type="button" class="ov-btn ov-btn--primary">${c.cta}</button><button type="button" class="ov-btn ov-btn--secondary">${c.how}</button></div><div class="facts">${c.facts.map(f => `<span>${f}</span>`).join('')}</div></div>
				<div class="lp-visual">${card}<span class="seal-badge">${sealImg(mode, mobile ? 72 : 96)}</span></div></div></section>
			<section class="lp-sec"><div class="lp-in"><div><h2>${c.howT}</h2><p class="sec-lead">${c.howL}</p></div><ol class="lp-steps">${c.steps.map((st, i) => `<li><span class="n">0${i + 1}</span><h3>${st[0]}</h3><p>${st[1]}</p></li>`).join('')}</ol></div></section>
			<section class="lp-sec"><div class="lp-in"><div><h2>${c.protT}</h2><p class="sec-lead">${c.protL}</p></div><div class="lp-prot"><div class="yes"><h3>${c.yesT}</h3><ul>${c.yes.map(x => `<li>${ok}<span>${x}</span></li>`).join('')}</ul></div><div class="no"><h3>${c.noT}</h3><ul>${c.no.map(x => `<li>${warnI}<span>${x}</span></li>`).join('')}</ul></div></div></div></section>
			<section class="lp-sec"><div class="lp-in"><h2>${c.featT}</h2><div class="lp-feat">${c.feat.map(f => `<div><span class="v">${f[0]}</span><p>${f[1]}</p></div>`).join('')}</div><p class="sec-lead" style="margin:0">${c.featNote}</p></div></section>
			<section class="lp-sec"><div class="lp-in"><h2>${c.faqT}</h2><div class="lp-faq">${c.faq.map((q, i) => `<details${i < 2 ? ' open' : ''}><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}</div></div></section>
			<section class="lp-sec"><div class="lp-in"><div class="lp-oss"><div><h2>${c.ossT}</h2><p class="sec-lead">${c.ossL}</p></div><div class="links">${c.oss.map(o => `<span><b>${o[0]}</b><span class="mono">${o[1]}</span></span>`).join('')}</div></div></div></section>
			<section class="lp-final"><div class="lp-in">${sealImg(mode, 64, true)}<h2>${c.finalT}</h2><button type="button" class="ov-btn ov-btn--primary">${c.finalBtn}</button></div></section>
			<footer class="lp-foot"><div class="lp-in"><span style="display:flex;align-items:center;gap:8px">${sealImg(mode, 20)}<b style="font-family:var(--font-heading);color:var(--color-text)">OneVello</b> · ${lg === 'en' ? 'Share once. Trust always.' : 'Надішліть раз. Довіряйте завжди.'}</span><nav>${c.foot.map(f => `<span>${f}</span>`).join('')}</nav><span>${c.copy}</span></div></footer>
		</div>`;
		lang = prevLang;
		return html;
	}

	R.landing = (el) => {
		const lg = el.dataset.lang;
		const fr = (mode, m) => {
			const w = m ? 390 : 1440;
			return `<div class="frame"><div class="frame-label"><b>Landing ${lg.toUpperCase()}</b><span>${w} · ${mode}</span></div><div class="ab-wrap" data-w="${w}"><div class="ab theme-${mode}${m ? ' mobile-ab' : ''}" style="width:${w}px">${landing(mode, m, lg)}</div></div></div>`;
		};
		el.innerHTML = `<div class="ov-stack" style="gap:16px"><div class="frames">${fr('light', false)}${fr('dark', false)}</div><div class="frames mobile">${fr('light', true)}${fr('dark', true)}</div></div>`;
		fit();
	};

	function frame(label, note, mode, mobile, html, flag) {
		const w = mobile ? 390 : 1440;
		return `<div class="frame"><div class="frame-label"><b>${label}</b><span>${flag ? `<span class="flag">${flag}</span> · ` : ''}${w} · ${mode}${note ? ' · ' + note : ''}</span></div><div class="ab-wrap" data-w="${w}"><div class="ab theme-${mode}${mobile ? ' mobile-ab' : ''}" style="width:${w}px">${shell(mode, mobile, html)}</div></div></div>`;
	}

	R.screens = (el) => {
		// data-screens="key:variant:label:flag|…"; each renders desktop light + dark and mobile light + dark unless data-modes limits it
		const items = el.dataset.screens.split('|').map(x => x.split(':'));
		const modes = (el.dataset.modes || 'dl,dd,ml,md').split(',');
		el.innerHTML = items.map(([key, variant, label, flag]) => {
			const make = (mode, m) => frame(label, '', mode, m, SCREENS[key](mode, m, variant), flag);
			const desk = modes.filter(x => x[0] === 'd').map(x => make(x[1] === 'l' ? 'light' : 'dark', false)).join('');
			const mob = modes.filter(x => x[0] === 'm').map(x => make(x[1] === 'l' ? 'light' : 'dark', true)).join('');
			return `<div class="ov-stack" style="gap:16px"><div class="frames">${desk}</div>${mob ? `<div class="frames mobile">${mob}</div>` : ''}</div>`;
		}).join('<hr style="border:0;border-top:1px solid var(--color-border);margin:8px 0">');
		fit();
	};

	function fit() {
		document.querySelectorAll('.ab-wrap').forEach(wrap => {
			const ab = wrap.firstElementChild, w = +wrap.dataset.w;
			const sc = Math.min(1, wrap.clientWidth / w);
			ab.style.transform = `scale(${sc})`;
			wrap.style.height = Math.ceil(ab.offsetHeight * sc) + 'px';
		});
	}
	window.addEventListener('resize', fit);
	if (document.fonts) document.fonts.ready.then(fit);

	function renderAll() {
		document.documentElement.lang = lang;
		document.querySelectorAll('[data-render]').forEach(el => { if (R[el.dataset.render]) R[el.dataset.render](el); });
	}

	document.addEventListener('click', (e) => {
		const b = e.target.closest('button');
		if (!b) return;
		if (b.dataset.themeSet) { theme = b.dataset.themeSet; store.set('ovb-theme', theme); applyTheme(); renderAll(); }
		else if (b.dataset.langSet) { lang = b.dataset.langSet; store.set('ovb-lang', lang); renderAll(); }
		else if (b.dataset.reveal) {
			const inp = document.getElementById(b.dataset.reveal);
			const show = inp.type === 'password';
			inp.type = show ? 'text' : 'password';
			b.setAttribute('aria-pressed', String(show));
			b.textContent = show ? t('hide') : t('show');
		} else if (b.hasAttribute('data-copy')) {
			const prev = b.innerHTML;
			b.classList.add('is-copied'); b.innerHTML = icon('check', 16) + t('copied');
			setTimeout(() => { b.classList.remove('is-copied'); b.innerHTML = prev; }, 1500);
		}
	});
	matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (theme === 'system') renderAll(); });
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll); else renderAll();
})();
