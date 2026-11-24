# OneVello rebrand: research
Work item: ONE-2, under the story ONE-1. Status: identity approved by the owner on 2026-11-24 (see §10).
Updated: 2026-11-24

## Owner decisions (2026-11-24)
- **Name:** stays "OneVello" (fixed by the owner).
- **Where the design lives:** in the repo, as linked static HTML pages in this folder (no Figma). The comparison of the three directions is in [directions.html](directions.html).
- **Direction:** **B. Seal («Печатка»)**, as recommended in §9, with C's mono treatment of the values the user copies (link, passphrase, counters). The owner first leaned to A (Veil), then settled on B. Palette, type (Source Serif 4 + IBM Plex Sans + IBM Plex Mono), shapes and voice follow §5 B.
- **Tagline:** stays **"Share once. Trust always."** / «Надішліть раз. Довіряйте завжди.». The landing places the plain "what it can't protect against" list (§4) near it, so the promise is never left alone.
- **Service data on the landing:** not listed there. What is stored next to the ciphertext goes into the Privacy Policy and Terms, not the landing.
- **Trust in the served code on the landing:** not listed there. It goes to the How it works page or SECURITY.md.
- **Logo:** none of the sketched marks in directions.html was accepted. Five new concepts were drawn in [logo.html](logo.html); the owner picked **S1, the broken seal** (a wax seal split by one crack). Files: `assets/logo-mark*.svg`, `app-icon*.svg`, `favicon.svg`, `logo-lockup*.svg`.

Sources: code facts sheet (verified 2026-11-24 from `src/i18n/locales/{en,uk}.ts`, `src/Pages/Secret.tsx`, `src/Pages/SecretID.tsx`, `src/components/UI/SVG/LogoSvg.tsx`, `src/index.css`, `README.md`); competitor pages read on 2026-11-24: yopass.se, bitwarden.com/help/send-encryption, privatebin.info, github.com/pglombardo/PasswordPusher, docs.onetimesecret.com and onetimesecret.com/en/about (search summary), support.1password.com/share-items (search summary), third-party write-ups for Privnote (its own site blocked the fetch).

## 1. Who uses it, and when
The sender has a short piece of sensitive text or one small file and no safe place to put it. The recipient opens a link, types a passphrase, reads. **The recipient needs no account.** The sender needs none either; the optional Google sign-in only adds a "My secrets" dashboard (Waiting / Opened / Expired).

Moments the product supports today (text up to 10 000 characters, one file up to 5 MB, expiry 1h / 24h / 7d / 30d, one-time or many views):
| Moment | Sender to recipient | Why this tool fits |
|---|---|---|
| A password to a colleague | teammate, same company | Stays out of chat history; one-time view |
| An API key or `.env` value | developer to contractor or client | Short expiry; client needs no account |
| Wi-Fi or door code | host to a guest | Link with 24h or 7d expiry; no app to install |
| A recovery code | person to a family member or admin | One-time; sent once, then gone |
| A contract, certificate or key file (up to 5 MB) | anyone to anyone | Encrypted in the browser; one download |
| A secret you will re-read ("regular" mode) | sender to one team | Many views until expiry |

Not supported, so we do not market it: large files, team vaults, shared editing, automatic rotation, audit trails.

## 2. What the current brand gets wrong
- **Name usage.** "OneVello" is written as one word in a bold system font, but the page also says "secret", "link" and "message" for the same thing (`home.hero.subheading` says "messages and files", the button says "Create Secret", the result says "link"). Pick one noun for the object and use it everywhere.
- **Tagline.** "Share once. Trust always." mixes a true promise (once) with a promise the product cannot make (always). See §6.
- **No own colour.** The brand colour is whatever one of 20 perkslab themes the visitor picks; the default is near-black `#18181b` on `#f6f7f8`. Nothing is recognisably OneVello in a screenshot.
- **A logo that says nothing.** A 57x31 line drawing (one horizontal line, four crossing polylines, one vertical line) reads as a knot or a circuit. It does not say "once", "sealed" or "gone". The wordmark is plain bold text.
- **No mono.** A link and a passphrase are the two things users must copy exactly, yet both are in proportional type (the link is italic green). A mono face would signal "this is a value to copy".
- **Alerts are not themed.** Raw Tailwind (`bg-cyan-100`, `bg-amber-100`, `bg-green-100`, `text-red-500`) break in the dark and coloured themes.
- **One screen for every failure.** `expiredLink.message` = "This secret has been viewed or expired." is shown for: not found, expired, already opened, 5 wrong passphrases, and any network or load error. A user with a bad connection is told the secret is gone. Burned and not-found are technically the same state (the document is deleted), so one honest "gone" line is fine; a network error and a locked-out secret need their own lines.
- **The share screen forgets the key point.** After "Create link" there is no reminder to send the passphrase through another channel, and no summary of expiry or one-time. This is the single most important sentence in the product and it is missing at the moment it matters.
- **The one-time warning is late.** The document is deleted when the link page loads, before the passphrase is typed. The cyan box on the passphrase screen ("will self-destruct after being viewed") is shown after it already happened. The honest wording is "opening this page destroys it".
- **Copy overclaims** (each checked against the code; see the facts sheet):
  - `howItWorks.sections.localDecryption.details[1]`: "No Trace: ... permanently removed with no logs left behind." Firebase keeps its own logs; not verifiable. Also expired secrets are deleted only when someone opens the link or an admin cleans up.
  - `privacyPolicy.sections[1].paragraph`: "We do not collect IP addresses or any other tracking data." Hosting infrastructure may log them; not verifiable from the repo.
  - `home.features.selfDestructing.description`: "disappear forever after ... a specific time." Expiry is checked on open, not at the moment.
  - `home.features.endToEnd.title` "End-to-End Security" and `.description` "your text and files are encrypted": file name and type were stored in plain text (fixed in ONE-11: they are now encrypted with the same passphrase and the storage name is random).
  - `home.hero.subheading`: "securely and effortlessly". "Securely" is a promise that depends on the passphrase (minimum 3 characters).
  - `home.cta.heading` / `howItWorks.cta.heading`: "Ready to send a secure link?" The link is not what is secure; the passphrase is.
  - `home.trust.body`: "industry-standard AES-GCM" is true; "you hold the keys" is true only if the passphrase is strong. Keep, add the caveat.
  - `README.md`: "zero-knowledge encrypted messaging platform ... even database administrators cannot access your raw text." The second half is true of the ciphertext; "zero-knowledge" is a technical term with a specific meaning, and metadata is visible. Say "encrypted in the browser" instead. Also: it is not a messaging platform.
  - `privacyPolicy.sections[0].title` "Zero-Knowledge Commitment": same issue as above.
  - Already honest (keep): `terms` "cannot guarantee 100% protection"; `tooltips.expirationDate` ("permanently deleted the next time anyone opens it"); `tooltips.passphrase` ("we never store it").
- **Positioning.** Today the product sells itself as "privacy and security" in general. Every competitor does that. What it does that others mostly do not is the separate passphrase (§3).

## 3. Alternatives and positioning
Sources are in the header; "not verified" means the page I read did not say. Nothing here is a claim about anyone's security beyond what that page states.

| Tool | How the secret travels | Key in the link? | One-time | Expiry | Account | OneVello compared, honestly |
|---|---|---|---|---|---|---|
| Onetime Secret | Link to a server-held secret; optional passphrase (it stores a bcrypt hash of it, per its docs) | Not verified | Yes | Set by sender, minutes to days | Basic use needs none | Passphrase is optional there; mandatory here. Theirs is mature and has paid plans; ours is smaller and only text plus one file |
| Privnote | Link to a note; destroyed after reading | Reportedly yes, in the URL (third-party description, not verified on its site) | Yes (default) | Optional | No | Its link alone opens the note; ours needs the passphrase too. Ours has a file option and a dashboard; it is simpler and far better known |
| Yopass | Encrypted in the browser (OpenPGP), server stores ciphertext | Yes, after `#`, never sent to the server | Optional | 1h, 1 day, 1 week | No | Strong design, and a link-only flow (nothing to type) is easier for the recipient. Ours adds a second factor, but also a step |
| PrivateBin | Encrypted paste on a server you can self-host | Yes, in the URL | "Burn after reading" option | Configurable, includes "forever" | No | Self-hostable and proven; ours is hosted only. Its optional password is like our passphrase but not required |
| Password Pusher | Link to stored data; optional passphrase | Not verified | By view count | Views and/or time | Not required to open | Strong on view limits and self-hosting. We offer one-time or many; it offers N views |
| Bitwarden Send | Encrypted in the client with a random 128-bit key | Yes, after `#` | Max-views setting | Lifespan setting | Sender needs Bitwarden; recipient opens a link (not verified for all cases) | Best choice if the sender already uses Bitwarden. OneVello needs no sign-up at all. Optional password only gates access, it is not part of the key |
| 1Password item sharing | Share link to a vault item | Not verified | Not verified | Sender chooses | Sender needs a paid 1Password account; recipient needs none by default | Best for vault items and email-restricted links. We are free and need no vault; we are not a password manager |
| Plain chat or email | The text, in clear | n/a | No | No (stays in history) | Depends | The thing we replace. Free, instant, familiar, and it stays in the history forever |

**Where OneVello is genuinely different.** In link-fragment designs the link is the key: whoever gets the link reads the secret. In OneVello the link carries only a document id; the key comes from a passphrase sent on another channel (PBKDF2-SHA256, 600 000 iterations, then AES-256-GCM). A leaked link alone is not enough. **Where it is worse.** The passphrase can be weak (min 3 characters), and anyone with the link can download the ciphertext and try offline. The 5-attempt limit is enforced by the client and slows casual guessing only. Sending two things costs the recipient one extra step.

**Positioning statement (en).** For people who must send a password, key or small file to someone who has no account, OneVello is the one-time secret link whose passphrase travels separately, so the link alone opens nothing.

**Positioning statement (uk).** Для тих, хто має передати пароль, ключ чи невеликий файл людині без облікового запису, OneVello — одноразове посилання на секрет, а парольна фраза йде окремо, тож саме посилання нічого не відкриє.

**Value-line candidates**
1. en: "The link opens nothing without the passphrase." / uk: «Без парольної фрази посилання нічого не відкриє.»
2. en: "Send the link here. Send the passphrase there." / uk: «Посилання надішліть тут, парольну фразу — деінде.»
3. en: "One link, one reader, then it is gone." / uk: «Одне посилання, один читач, і секрету вже немає.» (true for one-time mode only; say so)

**Words to keep out:** military-grade, unhackable, 100% secure, zero logs, no trace, "completely secure", "bank-level", "uncrackable", "anonymous" (accounts and metadata exist), "forever" for deletion timing, "zero-knowledge" as a headline (use "encrypted in your browser"), "cryptographically random" for the passphrase generator.

## 4. Trust rules
**What we may say, with its basis in the code**
| Claim | Basis |
|---|---|
| Text and files are encrypted in your browser before they are sent | `PasswordChannel.encrypt` in secure-channel-sdk 3.0.0, called client-side |
| We store ciphertext, not your text | Firestore doc holds ciphertext, tag, iv, salts, dates, flags |
| The passphrase is not in the link and is not stored | Link is `<origin>/secret/<docId>`; passphrase never written |
| AES-256-GCM with a key derived from the passphrase (PBKDF2-SHA256, 600 000 iterations, HKDF) | SDK parameters |
| The recipient needs no account | Open and reveal flow needs no sign-in |
| A one-time secret is deleted the moment the link page is opened | Client deletes on page load |
| A one-time file can be downloaded once | Deleted from storage after first download |
| After 5 wrong passphrases the secret is deleted | Attempts counter in the doc (enforced by the client) |
| The link works over HTTPS | Firebase Hosting |
| The code is open source | `github.com/myk-d/onevello`, LICENSE present |

**What we must never say.** Anything in the banned list in §3. Also: that deletion happens "at" expiry; that nothing is logged; that the server rules protect the data (Firestore rules are not in this repo, so unverified); that a short passphrase is safe; that the 5-attempt limit stops an offline attacker.

**What OneVello can't protect against (ready for the landing)**

What is stored next to the ciphertext (that a secret exists, its dates, the account link; for files attached before ONE-11 also the file name and type) is not on the landing: by the owner's decision it belongs in the Privacy Policy (see the follow-up stories). The same goes for trust in the served code (the browser loads the encrypting code from the site on every visit; open source lets anyone check the repo, but not that the served build matches it): it belongs on the How it works page or in SECURITY.md, not the landing.

en:
- A weak or leaked passphrase. Use the generator, and never send the link and the passphrase in the same message.
- Whoever opens the link first. A forwarded link or an early open burns a one-time secret.
- After it is opened, the secret is in the recipient's hands. We delete it from the server, but can't stop them copying the text or taking a screenshot.
- Malware or a bad browser extension on either device.

uk:
- Слабка або викрадена парольна фраза. Скористайтеся генератором і ніколи не надсилайте посилання та парольну фразу в одному повідомленні.
- Той, хто відкриє посилання першим. Якщо посилання переслали або відкрили зарано, одноразовий секрет згорає.
- Після відкриття секрет у руках одержувача. Ми видаляємо його із сервера, але не можемо завадити скопіювати текст чи зробити знімок екрана.
- Шкідливе програмне забезпечення чи небезпечне розширення браузера на будь-якому з пристроїв.

## 5. Three directions

All three share the same roles (`--color-<role>` in the brand CSS), so the chosen one can move into the app as tokens. `border` is for dividers and is decorative; `border-strong` is for input borders and focus rings and meets the 3:1 non-text minimum. Every text pair in the tables was computed with the WCAG 2.1 formula (script in the session scratchpad), and all pass AA at 4.5:1 or more.

**Fonts** are all free on Google Fonts (OFL), and their full Cyrillic and Cyrillic-ext subsets were checked against the Google Fonts metadata on 2026-11-24. They are self-hosted in the app (`@fontsource/*`). Every direction has a mono face, because the link, the passphrase and the "attempts left" count are values the user must read or copy exactly.

**Type scale (shared):** 12 (16) · 14 (20) · 16 (24) · 18 (28) · 24 (32) in the app; 32 (40) · 48 (56) · 64 (72) on the landing. The link and passphrase are set in mono at 15–16 px, never italic.

**Today's perkslab themes:** the 20-theme switcher goes. Each direction keeps one light and one dark theme (system default, with a manual toggle), so OneVello finally has one colour.

### A. Veil («Вуаль») — quiet and discreet

**Idea:** the secret sits behind a veil, and the veil lifts once.

**Name:** "One" is the one lifting. "Vello" reads like *velo* / *velum* (veil). The wordmark is "OneVello" in Commissioner 600 with the double "ll" drawn as two upright strokes and a translucent band laid across them, a small curtain inside the name.

**Mark and icon:** a rounded square with one corner folded up like a lifted veil, showing a single dot ("one") underneath. At 32 px and below only the fold and the dot remain.

**Palette:** mist lavender and deep indigo ink, with a teal accent for the "ready" and "copied" moments.

| Role | Light | Dark | Contrast light / dark |
|---|---|---|---|
| bg | `#F3F2F7` | `#121019` |  |
| surface | `#FBFAFD` | `#1A1724` |  |
| surface-raised | `#FFFFFF` | `#231F30` |  |
| surface-sunken | `#EAE8F1` | `#0D0B12` |  |
| border | `#DDDAE7` | `#322D42` |  |
| border-strong | `#857F9C` | `#6F6989` | on surface 3.66 / 3.40 |
| text | `#1B1830` | `#ECEAF4` | on bg 15.46 / 15.84 · on surface 16.55 / 14.80 · on surface-raised 17.21 / 13.47 · on surface-sunken 14.19 / 16.43 |
| muted | `#57536E` | `#A8A3BD` | on bg 6.57 / 7.76 · on surface 7.04 / 7.25 · on surface-sunken 6.04 / 8.05 |
| primary | `#4B3FA8` | `#B3AAFF` | on bg 7.32 / 9.08 · on surface 7.84 / 8.48 |
| on-primary | `#FFFFFF` | `#1B1450` | on primary 8.15 / 8.01 |
| accent | `#0B7480` | `#5CCFD8` | on bg 4.93 / 10.21 · on surface 5.28 / 9.54 |
| success | `#1D7347` | `#6FD39C` | on surface 5.62 / 9.63 · on surface-sunken 4.81 / 10.69 |
| warning | `#835400` | `#E9BC62` | on surface 6.25 / 9.93 · on surface-sunken 5.35 / 11.02 |
| danger | `#B0261E` | `#FF8A80` | on surface 6.43 / 7.72 · on surface-sunken 5.51 / 8.57 |

**Type:** Commissioner for headings (600) and body (400; variable, with a soft "flair" axis kept at 0 in the UI), and JetBrains Mono for links and codes.

**Shape:** radius 12 / 16 / 24 / full. Soft diffuse shadows (`0 12px 32px rgb(27 24 48 / .10)`). A frosted surface (`backdrop-filter: blur`) is used only for the veiled preview.

**Icons:** lucide at a 1.5 stroke, 16 / 20 px.

**Motion:**
- Encrypting: the typed text blurs under a frosted layer (≤ 600 ms, tied to the real encrypt call).
- Link copied: a teal check plus a soft glow on the field (200 ms).
- Reveal: the veil slides up (350 ms, ease-out).
- Burned: the text blurs out and fades (500 ms).
- Reduced motion: crossfades only.

**Taglines:** "Lifted once. Then gone." / «Відкривається раз. Потім зникає.» Or the marketer's #3.

**Voice:** quiet and discreet. Short, low-key lines.

| Moment | en | uk |
|---|---|---|
| Create | Hide it behind a passphrase. | Сховайте за парольною фразою. |
| Copied | Link copied. The passphrase goes another way. | Посилання скопійовано. Парольна фраза — іншим шляхом. |
| Reveal warning | This secret lifts once. Opening it deletes it. | Цей секрет відкривається лише раз. Відкриття його видаляє. |
| Burned | Already opened. Nothing is left here. | Уже відкрито. Тут нічого не лишилося. |
| Expired | This link ran out of time. Ask for a new one. | Час цього посилання минув. Попросіть нове. |
| Wrong passphrase | That passphrase doesn't fit. 3 tries left. | Ця парольна фраза не підходить. Лишилося 3 спроби. |

**Strengths:** the most elegant and calm direction; the name gets a meaning; it suits non-technical recipients (a guest, a family member).

**Risks:**
- A veil suggests *hiding*, not *encrypting*. A blur effect can read as "the data is just blurred".
- Violet is the de-facto colour of privacy products, so it is the least ownable of the three.

### B. Seal («Печатка») — a sealed letter, broken once

**Idea:** the secret travels like a sealed letter. The link is the envelope, and the passphrase is what breaks the seal. Once it is broken, it can't be sealed again.

**Name:** "Vello" echoes *vellum*, the parchment that letters and seals were written on. "One" is the one seal, broken once. The wordmark is "OneVello" in Source Serif 4 semibold, with the "O" of "One" as a small round wax seal (filled, with a notch) that can be used on its own.

**Mark and icon:** the wax-seal disc with a notch, in burgundy on a navy-ink tile for the app icon. At 32 px and below it is a solid disc with the notch.

**Two-part story:** "the envelope travels here, the key travels there" maps exactly onto §3's real difference (the passphrase is not in the link).

**Palette:** warm paper, navy ink as primary, and burgundy wax as the accent (only for the mark and the "seal" moments). Danger stays an orange-red, so it doesn't collide with the wax.

| Role | Light | Dark | Contrast light / dark |
|---|---|---|---|
| bg | `#F6F2EA` | `#15120E` |  |
| surface | `#FFFCF6` | `#1E1A15` |  |
| surface-raised | `#FFFFFF` | `#28231C` |  |
| surface-sunken | `#EDE7DB` | `#0F0D0A` |  |
| border | `#DDD4C3` | `#383126` |  |
| border-strong | `#8E8370` | `#7A6F5D` | on surface 3.64 / 3.51 |
| text | `#211C16` | `#F0EADF` | on bg 15.14 / 15.59 · on surface 16.51 / 14.45 · on surface-raised 16.90 / 13.02 · on surface-sunken 13.73 / 16.21 |
| muted | `#5E5548` | `#AFA595` | on bg 6.56 / 7.68 · on surface 7.15 / 7.12 · on surface-sunken 5.94 / 7.98 |
| primary | `#1F3352` | `#A9C1E6` | on bg 11.37 / 10.19 · on surface 12.40 / 9.44 |
| on-primary | `#FFFFFF` | `#14233A` | on primary 12.70 / 8.61 |
| accent | `#7A2E4A` | `#E59AB6` | on bg 8.12 / 8.56 · on surface 8.85 / 7.93 |
| success | `#2E6B3A` | `#8CCB95` | on surface 6.25 / 9.14 · on surface-sunken 5.20 / 10.25 |
| warning | `#875600` | `#E6B65A` | on surface 6.10 / 9.23 · on surface-sunken 5.07 / 10.35 |
| danger | `#B42318` | `#F38A7E` | on surface 6.42 / 7.21 · on surface-sunken 5.34 / 8.08 |

**Type:**
- Headings and wordmark: Source Serif 4 (600), from 20 px up only.
- Body: IBM Plex Sans.
- Mono: IBM Plex Mono (the link, passphrase, counters).
- No serif in inputs, buttons or alerts.

**Shape:** radius 6 / 10 / 14 / full, like paper cards with crisp edges. Shadows are a paper lift (`0 1px 2px rgb(33 28 22 / .06), 0 8px 24px rgb(33 28 22 / .08)`).

**Icons:** lucide at a 1.75 stroke, plus two custom glyphs: the seal (intact) and the broken seal.

**Motion:**
- Encrypting: the card folds shut and the seal is pressed (≤ 600 ms, ends when the link exists).
- Link copied: the seal gives one short pulse and "Copied" appears (200 ms).
- Reveal: the seal splits in two and the card opens (350 ms).
- Burned: the broken seal, the card goes to an outline (400 ms).
- Reduced motion: static seal states with a crossfade.

**Taglines:**
- "Sealed for one reader." / «Запечатано для одного читача.» (one-time mode)
- "The link is the envelope. The passphrase is the key." / «Посилання — конверт. Парольна фраза — ключ.»

**Voice:** courteous and exact, like a good courier. It says what happens and in which order.

| Moment | en | uk |
|---|---|---|
| Create | Seal it with a passphrase. | Запечатайте парольною фразою. |
| Copied | Link copied. Send the passphrase separately: it isn't in the link. | Посилання скопійовано. Парольну фразу надішліть окремо: у посиланні її немає. |
| Reveal warning | This secret can be opened once. Opening breaks the seal and deletes it. | Цей секрет можна відкрити лише раз. Відкриття зламає печатку й видалить його. |
| Burned | The seal is broken. This secret was opened and deleted. | Печатку зламано. Секрет уже відкрили й видалили. |
| Expired | This link has expired. Ask the sender for a new one. | Термін дії посилання минув. Попросіть відправника про нове. |
| Wrong passphrase | The passphrase doesn't match. 3 attempts left, then the secret is deleted. | Парольна фраза не збігається. Залишилося 3 спроби, потім секрет буде видалено. |

**Strengths:**
- The most ownable: no alternative in §3 uses a paper-and-seal language.
- The metaphor teaches the real model (two parts, broken once) without technical words.
- The name gains a meaning (vellum).

**Risks:**
- It can feel old-fashioned or slow for a developer sending an API key; Plex Sans, mono values and crisp shapes counter that.
- Seal animations can turn kitsch, so keep them to the four moments above.

### C. Token («Токен») — a precise one-time tool

**Idea:** a secret is a one-time token, like a one-time code. It works once and it is exact.

**Name:** "One" is the digit 1, single use. "Vello" stays quiet. The wordmark is "OneVello" in Geologica, with "One" at 700 and "Vello" at 400, followed by a small cyan cursor bar that can blink once on load.

**Mark and icon:** square brackets around a dot, `[•]`, a slot holding exactly one thing, on a graphite tile. At 32 px and below the brackets get thicker and the dot gets bigger.

**Palette:** graphite and white with a cyan signal accent (focus, "copied", the cursor).

| Role | Light | Dark | Contrast light / dark |
|---|---|---|---|
| bg | `#F6F7F6` | `#0B0E0D` |  |
| surface | `#FFFFFF` | `#121614` |  |
| surface-raised | `#FFFFFF` | `#1A1F1C` |  |
| surface-sunken | `#ECEFED` | `#070908` |  |
| border | `#D9DEDB` | `#252B28` |  |
| border-strong | `#7B8580` | `#5F6964` | on surface 3.81 / 3.21 |
| text | `#0F1412` | `#E8EEEA` | on bg 17.32 / 16.48 · on surface 18.60 / 15.51 · on surface-raised 18.60 / 14.20 · on surface-sunken 16.06 / 16.97 |
| muted | `#525D58` | `#9AA6A0` | on bg 6.38 / 7.70 · on surface 6.85 / 7.25 · on surface-sunken 5.92 / 7.93 |
| primary | `#0F1412` | `#E8EEEA` | on bg 17.32 / 16.48 · on surface 18.60 / 15.51 |
| on-primary | `#FFFFFF` | `#0B0E0D` | on primary 18.60 / 16.48 |
| accent | `#006779` | `#5CE1F0` | on bg 6.08 / 12.45 · on surface 6.53 / 11.72 |
| success | `#1A7340` | `#62D68E` | on surface 5.88 / 10.02 · on surface-sunken 5.08 / 10.96 |
| warning | `#865500` | `#F0C04F` | on surface 6.34 / 10.74 · on surface-sunken 5.47 / 11.75 |
| danger | `#B3261E` | `#FF8A80` | on surface 6.54 / 8.00 · on surface-sunken 5.65 / 8.75 |

**Type:**
- Headings: Geologica (600–700).
- Body: Inter.
- Mono: Fira Code. Mono is a first-class voice here: the link is split into readable groups, the passphrase is in mono with a reveal toggle, and counters such as `3/5` are in mono.

**Shape:** radius 4 / 8 / 12, 1 px borders, and no shadows except on dialogs and toasts.

**Icons:** lucide at a 2.0 stroke, 16 px.

**Motion:**
- Encrypting: the text is replaced by masked dots, then the link types in (≤ 600 ms, no fake "decrypting…" scramble).
- Link copied: a cyan underline flash and "Copied" (150 ms).
- Reveal: the dots resolve to text left to right (250 ms).
- Burned: the characters turn to `·` and the field collapses (300 ms).
- Reduced motion: an instant swap.

**Taglines:** "One link. One read." / «Одне посилання. Одне прочитання.» (one-time mode). Or the marketer's #5.

**Voice:** terse and exact, close to developer tooling. Facts first, no adjectives.

| Moment | en | uk |
|---|---|---|
| Create | Encrypt and get a link. | Зашифруйте й отримайте посилання. |
| Copied | Copied. Send the passphrase on another channel. | Скопійовано. Парольну фразу — іншим каналом. |
| Reveal warning | One-time. Opening deletes it from the server. | Одноразовий. Відкриття видаляє його із сервера. |
| Burned | Opened once. Deleted. | Уже відкрито. Видалено. |
| Expired | Expired. Ask for a new link. | Термін минув. Попросіть нове посилання. |
| Wrong passphrase | Wrong passphrase. 3 attempts left. | Неправильна парольна фраза. Ще 3 спроби. |

**Strengths:** the best fit for the most frequent technical moments (API keys, `.env` values, passwords to colleagues). It is fast and clear, and it is the cheapest to build (borders, no illustrations).

**Risks:**
- Cold for non-technical recipients (a guest with a Wi-Fi code).
- Graphite plus cyan is common among dev tools, so it is less ownable.
- Any glyph effect must stay honest (no hacker clichés).


## 6. Tagline options
| # | en | uk | Verdict |
|---|---|---|---|
| 1 | Share once. Trust always. (current) | Надішліть раз. Довіряйте завжди. | "Once" is true in one-time mode. "Trust always" overpromises: it asks users to trust a weak passphrase or a forwarded link. Keep only if the owner wants continuity; then put the caveats right under it |
| 2 | Share once. | Надішліть раз. | Cuts the overpromise and keeps the name echo. Not true for regular (many-view) secrets, so it describes the main mode only |
| 3 | The link opens nothing without the passphrase. | Без парольної фрази посилання нічого не відкриє. | True to the code and our real difference. Long, and a statement more than a tagline |
| 4 | One link. One reader. Then gone. | Одне посилання. Один читач. І вже немає. | True for one-time mode; "gone" is true at the moment of opening, not at expiry. Misses the passphrase |
| 5 | Send the link here, the passphrase there. | Посилання тут, парольна фраза там. | True and teaches the correct habit. Tells how, not why |
| 6 | Passwords that don't linger in chat. | Паролі, що не залишаються в чаті. | True for one-time mode; regular secrets linger until expiry. Names the user's problem, which suits search and ads |

## 7. Voice & tone basics
1. **Say what happens, in the order it happens.** "Opening this page destroys the secret" beats "self-destructing".
2. **Name limits next to the promise.** One short clause, not a footnote.
3. **Calm, not alarming and not cute.** The user is about to send a password; no exclamation marks, no emoji, no jokes at errors.
4. **One word for one thing.** Secret (the object), link, passphrase. Never "message", "note", "key" or "password" for the passphrase.

| Do | Don't |
|---|---|
| "The link is not enough. Send the passphrase another way." | "Your data is safe with us!" |
| "This secret is gone: it was opened or it expired." | "Oops, something went wrong." |
| "3 attempts left." | "Careful, last chances!" |

**Sample lines (neutral voice; the directions will vary them)**

Note: today there is no copy for a reminder on the share screen, for a network error or for a locked-out secret. These lines are proposals.

| State | en | uk |
|---|---|---|
| Create, button | Create link | Створити посилання |
| Create, helper | Your text is encrypted in this browser. Choose a passphrase and send it separately. | Текст шифрується в цьому браузері. Оберіть парольну фразу й надішліть її окремо. |
| Copied | Link copied. Now send the passphrase by another channel: it is not in the link. | Посилання скопійовано. Парольну фразу надішліть іншим каналом: у посиланні її немає. |
| Reveal warning (one-time) | This secret can be opened once. Opening this page has already destroyed it, so copy what you need before you close it. | Цей секрет можна відкрити лише раз. Відкриття цієї сторінки вже видалило його, тож скопіюйте потрібне, перш ніж закрити. |
| Burned | This secret was already opened and has been deleted. | Цей секрет уже відкривали, тому його видалено. |
| Expired | This link has expired. Ask the sender for a new one. | Термін дії цього посилання минув. Попросіть відправника створити нове. |
| Wrong passphrase | Wrong passphrase. 3 attempts left; after that the secret is deleted. | Неправильна парольна фраза. Залишилось 3 спроби, після цього секрет буде видалено. |
| Not found | We cannot find this secret. It may have been opened, expired, or the link was copied incompletely. | Не вдалося знайти цей секрет. Його могли вже відкрити, термін міг минути, або посилання скопійовано не повністю. |

## 8. Flows, states and motion (UX)
Checked against `Secret.tsx`, `SecretID.tsx`, `EncryptedMessageForm`, `EncryptedMessageLink`, `DecryptedMessage`, `ExpiredLink`. "App change" = needs code, belongs in a follow-up story, not ONE-2. Copy keys refer to the sample lines in §7 (no i18n keys exist yet for the proposals).

### 8.1 Flows and friction
**Sender** (1440: one centred card, max-w 7xl; 390: same card, full width, stacked buttons)
| Step | What happens | Friction (where) | Smallest fix |
|---|---|---|---|
| 1 Compose | Textarea, counter, optional file | Passphrase and file are mixed into one long form; helper line is missing (`EncryptedMessageForm`) | Add §7 "Create, helper" under the textarea. Group: Secret / Passphrase / Rules |
| 2 Options | Passphrase + generator, expiry presets (default 24h), checkbox "One time link access *" | Footnote asterisk on the label; generator copies to the clipboard silently, only a toast says so (`Secret.tsx` ~L97-106); no mono for the passphrase | Switch with a plain label "One-time: destroyed when the link is opened" and a one-line hint of the effect. Show "Generated and copied" inline next to the field, keep the toast. Passphrase in mono |
| 3 Create | Button shows loading (PBKDF2 ~1 s), failure is a toast | Toast is the only error trace; it disappears | Keep the form data; add an inline danger alert above the button (same text as the toast) |
| 4 Share | Green box with the URL, open-in-tab icon, Copy, Create another (`EncryptedMessageLink`) | No "send the passphrase separately"; no summary of expiry or one-time; link in italic proportional text; icon-only open link; Copied button swaps to a different button | Add §7 "Copied" as a persistent warning alert, not a toast. Add a summary line: "One-time, expires 25 Nov 14:00". Mono link, wrap with `break-all`. Copied state keeps the same button size, label changes, aria-live |

**Recipient** (390 is the common case: a link from a chat app)
| Step | What happens | Friction | Smallest fix |
|---|---|---|---|
| 1 Open link | `SecretID` loads, deletes a one-time doc at once, then shows the form | The warning "self-destruct after being viewed" appears after it already happened. A link preview bot or a tap by accident burns it | **App change (follow-up):** interstitial "Open secret" with the warning BEFORE fetching; one-time docs are read and deleted only after the tap. Until then, wording must say "has already been destroyed" (§7 "Reveal warning") |
| 2 Passphrase | Password input, cyan info, amber attempts, "Preview" | Label is not bound to the input (`<label>` has no `htmlFor`); error only in a toast plus a red border; button says "Preview" but it reveals | Bind label; put the attempts alert in an `aria-live` region; rename button "Reveal secret". Add a show/hide toggle |
| 3 Reveal | Text in a field, Copy, Download, note, Create Secret | One-time and "close this window" are separate small notes | One success/warning alert at the top: "Shown once. Copy what you need." |
| 4 Done | Nothing | User cannot tell if the file download finished or was the last one | One-time file: after download, show "Downloaded. The file is deleted." (state in 8.2) |
| Any failure | One screen "viewed or expired" for five different causes, and a network error shows as gone | Wrong diagnosis; user may ask the sender for a new secret when they only need to retry | Split into three screens (8.2); network error with "Try again" is an app change |

### 8.2 State inventory
"Today" = can the code tell the state apart now? Y = yes, N = app change needed.
| Screen | State | What the user sees | What they can do | Copy (§7) | Today |
|---|---|---|---|---|---|
| Create | Empty | Empty textarea, counter 0 / 10 000, default expiry 24h | Type, attach, set options | Create, helper | Y |
| Create | Typing | Counter updates; amber near 90% (`isNearLimit`) | Continue | | Y |
| Create | Over limit | Red field + validation message | Shorten | none | Y |
| Create | File attached | File name, size, remove | Replace, remove | | Y |
| Create | File too large | Red "too large" under the drop zone; input cleared | Choose another file | none (`form.fileTooLarge`) | Y |
| Create | Submitting | Button spinner, fieldset disabled, ~1 s | Wait | | Y |
| Create | Error | Toast "failed to create" or "file upload failed"; form kept | Retry | none | Y |
| Share | Ready | URL, Copy, Create another | Copy, open, create another | Copied (as help text) | Y |
| Share | Copied | Button "Copied" 2 s | Send the passphrase, create another | Copied | Y |
| Reveal | Loading | Loader | Wait | | Y |
| Reveal | Passphrase | Form, info alert for one-time or regular | Type, submit | Reveal warning | Y |
| Reveal | Wrong, attempts left | Toast + amber "N attempts remaining"; field cleared | Retry | Wrong passphrase | Y (note: one-time docs are already deleted, so the counter is local only; a reload loses it) |
| Reveal | Locked out | SDK in-memory lock "Too many failed attempts" (30 s) shown only as a toast; after 5 fails the Gone screen | Wait 30 s | none | Partly: lock is a toast text, not a state |
| Reveal | Revealed text | Text field, Copy, Create Secret | Copy, close | Reveal warning | Y |
| Reveal | Revealed with file | Text plus Download attachment | Download | | Y |
| Reveal | One-time file downloaded | Nothing changes after click | Nothing | none | N: no downloaded state or error (fetch/decrypt in `handleDownloadFile` has no catch) |
| Gone | Burned | "viewed or expired" | Home, Create | Burned | N: same as not found (doc deleted) |
| Gone | Expired | same | same | Expired | N: code sees `expiration` past but sets the same state before delete |
| Gone | Not found | same | same | Not found | N: `!message` and burned are identical |
| Gone | Locked out (5 wrong) | same | same | Wrong passphrase (last line) | N: shares the Expired state |
| Gone | Offline / network error | same, wrong | none | none (proposal: "Could not reach the server. Your secret is not lost. Try again.") | N: `catch` sets Expired; split catch from not-found and add Retry |
| Gone | Unknown error | same | Home | none | N |

Burned and not found can stay one screen ("gone"); expired, network and lockout need their own lines. Minimum split: **Gone** (burned / not found), **Expired**, **Could not load (retry)**.

### 8.3 Component inventory (for the foundations page)
Common: focus ring 2 px offset 2 px, contrast ≥ 3:1 against both surface and neighbours; hit target ≥ 44 px on 390; never colour alone (icon + text); every state in light and dark (§5).
- **Button** primary, secondary, ghost, danger. States default, hover, focus-visible, active, disabled, loading (spinner, keeps width, `aria-busy`, label stays). Disabled keeps contrast of the label ≥ 3:1 and is not the only error signal.
- **Text input**: label above, helper below, error below with `aria-describedby` and `aria-invalid`; no placeholder-as-label.
- **Textarea + counter**: counter is `aria-live="polite"` only at 90% and 100% (not each keystroke); "x / 10 000" in mono digits.
- **Passphrase field**: mono; reveal toggle (button, `aria-pressed`, label "Show passphrase"); Generate button (announces "Generated and copied" via live region); strength meter as text + bar (weak/fair/strong) with `role="status"`; min 3 chars is a rule, not a recommendation, so show "short passphrases can be guessed".
- **Expiry select**: segmented presets 1h, 24h, 7d, 30d, plus custom date; radio group semantics; the chosen absolute time is printed ("Expires 25 Nov, 14:00").
- **One-time switch**: `role="switch"`, plain label, effect line under it; replaces the asterisk checkbox.
- **Copy-link field**: read-only mono value, `break-all`, one-tap Copy button beside or below (full width on 390); Copied state 2 s, label and icon change, `aria-live="polite"`; open-in-tab is a text link, not an icon alone.
- **File drop zone**: keyboard-activatable (Enter/Space opens picker), dashed border from token, shows name, size, remove; too-large and type errors inline.
- **Alerts** info, success, warning, danger: tokenised (replace `cyan/amber/green/red`), icon + title + one sentence; danger/warning that need action use `role="alert"`, others `role="status"`.
- **Toast**: for confirmations only (copied, generated); 4 s, pause on hover/focus, dismissible, `aria-live="polite"`; errors that need action also appear inline.
- **Dialog** ("Open this one-time secret now?"): focus trapped, first focus on the safe action ("Not now"), Esc closes, return focus, primary "Open and destroy"; full-width stacked buttons on 390.
- **Skeleton / loader**: skeleton for the passphrase card; spinner only inside buttons; `aria-busy`; static fallback under reduced motion.

### 8.4 Motion moments (direction-neutral)
Rule: motion explains a state change; it never fills time. Encryption is one real PBKDF2 pass (~1 s); no staged "securing" steps, no fake percentages. Use `transform` and `opacity` only.
| Moment | Must communicate | Duration, easing | prefers-reduced-motion |
|---|---|---|---|
| Encrypting (submit to link ready) | Work is happening now; ends when it ends | Indeterminate spinner on the button, no minimum time; result enters 200-300 ms, ease-out | Static "Creating..." label, instant swap |
| Link copied | The value is on the clipboard | 150-200 ms swap, ease-out; label back after 2 s | Label change only |
| Reveal (passphrase accepted) | The secret is now in front of you, once | 250-400 ms fade/rise of the text card, ease-out | Instant appear |
| Burned / destroyed | The secret no longer exists; it is final, not an error | 300-500 ms fade-out of the old card, then the gone screen; no particles, no fire | Instant swap; the words carry the meaning |
| Wrong passphrase | Not accepted, try again, N left | 200-300 ms horizontal shake ≤ 6 px, ease-in-out, once, with the attempts line | No shake; field border and attempts alert change |

### 8.5 Accessibility and responsiveness
- **Keyboard order (create):** secret text, file, passphrase, show, generate, expiry, one-time, Create. Share: Copy first, then open, then Create another. Reveal: passphrase, show, Reveal.
- **Focus management:** after Create, move focus to the share heading; after a wrong passphrase, return focus to the field; on the gone screen focus the heading. Announce state with one live region per screen, not per element.
- **Labels and errors:** each control has a visible `<label for>`; tooltips (`title`) are never the only description. Errors sit directly under the field, associated with `aria-describedby`; toasts duplicate, never replace.
- **Contrast:** handled by the palettes in §5 for all 20 themes; alert tokens must be defined per theme.
- **Responsive:** 1440 content max ~640 px card (not 7xl full width) to keep lines short; 390 single column, 16 px gutters, buttons full width and stacked, primary on top, mono link wraps, no horizontal scroll, input font ≥ 16 px (no iOS zoom).
- **Touch:** targets ≥ 44 px, ≥ 8 px between Copy and Create another. Language: every state has both uk and en copy; uk strings run ~20% longer, so do not size buttons to the en text.

### 8.6 App changes for follow-up stories
1. "Open secret" interstitial before fetching a one-time secret (fixes preview-bot and early-open burn). 2. Split the failure states: gone, expired, could not load (retry), lockout as a state. 3. Share screen: passphrase reminder, expiry/one-time summary, mono link. 4. Label binding and aria-live in the reveal flow; try/catch and a downloaded state for the file. 5. Tokenised alerts replacing raw Tailwind colours.

## 9. Recommendation

**B. Seal, with C's mono treatment of values.**

- **It explains the product without technical words.** The envelope is the link and the key is the passphrase: the link alone opens nothing, and the seal breaks once. That is exactly §3's real difference and §4's trust rules, without "military-grade" anything.
- **It is the only ownable look.** The alternatives are dark tech or violet privacy; paper, ink and a wax seal stand apart in a screenshot.
- **"Vello ↔ vellum" gives the fixed name a meaning** instead of a pun.
- **From C:** every value the user copies (the link, passphrase, counters) is in mono, the link is shown in groups, and the sans UI stays crisp, so it doesn't feel slow to developers.
- **Keep A out:** blur-as-security suggests hiding rather than encrypting.
- **Before Phase 2:** confirm the tagline. I suggest "Sealed for one reader." (one-time mode) with "The link opens nothing without the passphrase." as the hero sub-line.

## 10. Final identity (approved by the owner on 2026-11-24)

**OneVello: the sealed letter.** The link is the envelope, the passphrase breaks the seal, and a seal breaks once.

- **Name and wordmark:** "OneVello", one word with a capital V, set in Source Serif 4 600, tracked −1.2%.
- **Mark:** S1, the broken seal. A burgundy wax seal split by one crack, with the two halves slightly apart. The app icon puts the wax on a navy tile. At 32 px and below the ring and fine crack are dropped and the gap widens.
- **Tagline:** "Share once. Trust always." / «Надішліть раз. Довіряйте завжди.» The hero sub-line is "The link opens nothing without the passphrase…", and the "Not protected" list stays on the landing.
- **Type:**
  - Source Serif 4 for titles, 20 px and up only.
  - IBM Plex Sans for the interface.
  - IBM Plex Mono for every value the user reads back or copies (link in groups of four, passphrase, counters such as `2/5`).
  - All three are OFL with full Cyrillic, self-hosted in the app.
- **Colour:** paper and ink, navy as the only action colour, burgundy wax for the mark only. One light and one dark theme replace the 20 perkslab themes.
- **Shape:** radius 6 / 10 / 14 / full. One card per screen with the paper-lift shadow; dialogs and toasts float.
- **Motion:** five moments only. Sealing (tied to the real encrypt call), copied, reveal, burned and wrong passphrase, each with a reduced-motion fallback (see foundations.html).
- **Voice:** courteous and exact. It says what happens and in which order, and names the limit next to the promise. No "military-grade", "unhackable", "100% secure" or "no trace".
- **File names:** encrypted with the same passphrase since ONE-11; the gate shows only "File attached".
- **Product changes the design depends on** (see §8.6 and the follow-up stories):
  - a sealed gate before a one-time secret is opened;
  - separate failure states;
  - the share-screen reminder to send the passphrase separately.

### Tokens

Source: `docs/product/brand/assets/brand.css`. The `--color-*` names move into `src/index.css` as they are. Contrast is computed live on foundations.html: every text pair passes AA, and non-text pairs reach ≥ 3:1.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#F6F2EA` | `#15120E` | page background |
| `--color-surface` | `#FFFCF6` | `#1E1A15` | section and input groups |
| `--color-surface-raised` | `#FFFFFF` | `#28231C` | cards, inputs, dialogs |
| `--color-surface-sunken` | `#EDE7DB` | `#0F0D0A` | link and passphrase fields, chips, secret box |
| `--color-border` | `#DDD4C3` | `#383126` | dividers (decorative) |
| `--color-border-strong` | `#8E8370` | `#7A6F5D` | input borders (≥ 3:1) |
| `--color-text` | `#211C16` | `#F0EADF` | body text |
| `--color-muted` | `#5E5548` | `#AFA595` | secondary text, helpers |
| `--color-primary` | `#1F3352` | `#A9C1E6` | buttons, links, selected presets |
| `--color-primary-hover` | `#2A4268` | `#BFD2EF` | primary hover |
| `--color-on-primary` | `#FFFFFF` | `#14233A` | text on primary |
| `--color-accent` | `#7A2E4A` | `#E59AB6` | wax-family text accent (sparingly) |
| `--color-success` | `#2E6B3A` | `#8CCB95` | copied, ready, strong passphrase |
| `--color-warning` | `#875600` | `#E6B65A` | attempts left, gate warning |
| `--color-danger` | `#B42318` | `#F38A7E` | errors, wrong passphrase, delete |
| `--color-on-danger` | `#FFFFFF` | `#2A0A06` | text on danger |
| `--color-seal` | `#7A2E4A` | `#C9607F` | the mark and seal moments only (non-text, ≥ 3:1) |
| `--color-focus` | `#1F3352` | `#A9C1E6` | focus ring |
| `--color-scrim` | `rgb(33 28 22 / 0.45)` | `rgb(0 0 0 / 0.6)` | dialog backdrop |

| Token | Value |
|---|---|
| `--font-heading` / `--font-body` / `--font-mono` | Source Serif 4 / IBM Plex Sans / IBM Plex Mono |
| `--text-xs` … `--text-4xl` | 12/16 · 14/20 · 16/24 · 18/28 · 24/32 · 32/40 · 48/56 · 64/72 |
| `--radius-chip` / `-control` / `-card` / `-full` | 6 / 10 / 14 / 999 px |
| `--space-1` … `--space-8` | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px |
| `--shadow-card` / `--shadow-float` | paper lift / floating (per theme) |
| `--duration-fast` / `-base` / `-slow` | 150 / 250 / 400 ms |
| `--ease-out` / `--ease-in-out` | cubic-bezier(.2,.7,.2,1) / cubic-bezier(.6,0,.3,1) |

### Pages and files

| Page | What |
|---|---|
| [index.html](index.html) | Overview, decisions, links |
| [foundations.html](foundations.html) | Palette, live contrast, type, shape, motion, components in both themes, do / don't |
| [logo.html](logo.html) | Final mark, app icon, favicon, lockups; the four other concepts for history |
| [create.html](create.html) · [share.html](share.html) · [reveal.html](reveal.html) · [states.html](states.html) | Screens at 1440 and 390, light and dark |
| [landing-uk.html](landing-uk.html) · [landing-en.html](landing-en.html) | Landings at 1440 and 390, light and dark; one English OG image (crawlers do not run JS) |
| [directions.html](directions.html) | The three phase-1 directions |
| `assets/` | `brand.css`, `brand.js`, `logo-mark{,-dark,-small}.svg`, `app-icon{,-small}.svg`, `favicon.svg`, `logo-lockup{,-dark}.svg`, `og-en.svg` |
