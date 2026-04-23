import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { Theme, useAppTheme } from './ThemeContext';

const themeGroups = [
	{
		label: 'Classic',
		options: [
			{ id: 'light', name: 'White' },
			{ id: 'dark', name: 'Deep Black' },
		],
	},
	{
		label: 'Ocean',
		options: [
			{ id: 'blue-light', name: 'Blue Light' },
			{ id: 'blue-dark', name: 'Blue Dark' },
		],
	},
	{
		label: 'Forest',
		options: [
			{ id: 'green-light', name: 'Green Light' },
			{ id: 'green-dark', name: 'Green Dark' },
		],
	},
	{
		label: 'Royal',
		options: [
			{ id: 'purple-light', name: 'Purple Light' },
			{ id: 'purple-dark', name: 'Purple Dark' },
		],
	},
	{
		label: 'Flame',
		options: [
			{ id: 'red-light', name: 'Red Light' },
			{ id: 'red-dark', name: 'Red Dark' },
		],
	},
	{
		label: 'Sun',
		options: [
			{ id: 'yellow-light', name: 'Yellow Light' },
			{ id: 'yellow-dark', name: 'Yellow Dark' },
		],
	},
];

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useAppTheme();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const currentThemeName = themeGroups.flatMap((g) => g.options).find((o) => o.id === theme)?.name || 'Theme';

	return (
		<div className="relative inline-block text-left" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-4 py-2 border border-brand rounded-xl bg-page-bg text-page-text font-bold text-sm uppercase tracking-wider transition-all hover:bg-brand-bg active:scale-95 cursor-pointer"
			>
				<div className="w-3 h-3 rounded-full bg-brand" />
				{currentThemeName}
				<svg className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-56 max-h-[400px] overflow-y-auto bg-page-bg border border-brand rounded-2xl shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-200">
					<div className="p-2 space-y-4">
						{themeGroups.map((group) => (
							<div key={group.label}>
								<p className="px-3 text-[10px] font-black uppercase text-page-text/40 mb-2">{group.label}</p>
								<div className="grid grid-cols-1 gap-1">
									{group.options.map((opt) => (
										<button
											key={opt.id}
											onClick={() => {
												setTheme(opt.id as Theme);
												setIsOpen(false);
											}}
											className={cn(
												'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer',
												theme === opt.id ? 'bg-brand text-page-bg' : 'text-page-text hover:bg-brand-bg',
											)}
										>
											{opt.name}
											{theme === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-page-bg" />}
										</button>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
