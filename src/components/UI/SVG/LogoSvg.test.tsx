import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LogoSvg from './LogoSvg';

describe('LogoSvg', () => {
	it('renders two halves filled with the seal token by default', () => {
		const { container } = render(<LogoSvg />);
		const fills = [...container.querySelectorAll('path[fill]')].map((p) => p.getAttribute('fill'));
		expect(fills).toEqual(['var(--color-seal)', 'var(--color-seal)']);
		expect(container.querySelectorAll('clipPath')).toHaveLength(2);
	});

	it('allows a colour override and size', () => {
		const { container } = render(<LogoSvg color="#000" size={32} />);
		const svg = container.querySelector('svg')!;
		expect(svg.getAttribute('width')).toBe('32');
		expect(container.querySelector('path[fill]')!.getAttribute('fill')).toBe('#000');
	});

	it('uses unique clip ids per instance', () => {
		const { container } = render(
			<>
				<LogoSvg />
				<LogoSvg />
			</>,
		);
		const ids = [...container.querySelectorAll('clipPath')].map((c) => c.id);
		expect(new Set(ids).size).toBe(4);
	});
});
