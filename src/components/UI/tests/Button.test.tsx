import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '../Button';

describe('Button component', () => {
	it('should show correct text', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('should have default variant', () => {
		render(<Button variant="default">Button</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-brand');
	});
});
