import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import React, { useEffect, useMemo, useRef, useState } from 'react';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
	weekStart: 1,
});

interface Props {
	value: Dayjs;
	onChange: (date: Dayjs) => void;
	dateFormat?: string;
	onBlur?: () => void;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, Props>(({ value, onChange, dateFormat = 'DD.MM.YYYY - HH:mm', onBlur }, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	React.useImperativeHandle(ref, () => containerRef.current!);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
				if (isOpen) onBlur?.();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onBlur]);

	const years = useMemo(() => {
		const currentYear = dayjs().year();
		return Array.from({ length: 5 }, (_, i) => currentYear + i);
	}, []);

	const months = dayjs.months();

	const days = useMemo(() => {
		const startOfMonth = value.startOf('month');
		const endOfMonth = value.endOf('month');

		const startGrid = startOfMonth.startOf('week');
		const endGrid = endOfMonth.endOf('week');

		const calendar = [];
		let date = startGrid;

		while (date.isBefore(endGrid) || date.isSame(endGrid, 'day')) {
			calendar.push(date);
			date = date.add(1, 'day');
		}
		return calendar;
	}, [value]);

	return (
		<div className="relative w-full inline-block font-sans" ref={containerRef}>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between min-w-60 px-4 py-2.5 border border-brand rounded-xl cursor-pointer bg-page-bg hover:bg-brand-bg transition-all duration-300 shadow-sm"
			>
				<span className="text-page-text font-medium">{value.format(dateFormat)}</span>
				<svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>

			{isOpen && (
				<div className="absolute z-50 mt-2 p-4 bg-page-bg border border-brand rounded-2xl shadow-2xl w-[320px] transition-colors duration-300">
					<div className="flex gap-2 mb-4">
						<select
							value={value.year()}
							onChange={(e) => onChange(value.year(parseInt(e.target.value)))}
							className="flex-1 p-2 bg-brand-bg border border-brand/20 rounded-lg text-sm font-semibold outline-none focus:border-brand text-page-text cursor-pointer transition-all"
						>
							{years.map((y) => (
								<option key={y} value={y}>
									{y}
								</option>
							))}
						</select>
						<select
							value={value.month()}
							onChange={(e) => onChange(value.month(parseInt(e.target.value)))}
							className="flex-1 p-2 bg-brand-bg border border-brand/20 rounded-lg text-sm font-semibold outline-none focus:border-brand text-page-text cursor-pointer transition-all"
						>
							{months.map((m, i) => (
								<option key={m} value={i}>
									{m}
								</option>
							))}
						</select>
					</div>

					<div className="grid grid-cols-7 mb-2">
						{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
							<div key={d} className="text-center text-[11px] font-bold text-page-text/40 uppercase py-1">
								{d}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1">
						{days.map((date, i) => {
							const isCurrentMonth = date.month() === value.month();
							const isSelected = date.isSame(value, 'day');

							return (
								<button
									type="button"
									key={i}
									onClick={() => onChange(value.date(date.date()).month(date.month()).year(date.year()))}
									className={`
                    h-9 w-9 text-sm rounded-lg flex items-center justify-center transition-all duration-200
                    ${!isCurrentMonth ? 'text-page-text/20' : 'text-page-text font-medium'}
                    ${isSelected ? 'bg-brand text-page-bg' : 'hover:bg-brand-bg'}
                  `}
								>
									{date.date()}
								</button>
							);
						})}
					</div>

					<div className="mt-4 pt-4 border-t border-brand/10 flex items-center justify-center gap-3">
						<div className="text-center">
							<p className="text-[10px] text-page-text/40 uppercase font-bold mb-1">Hours</p>
							<input
								type="number"
								min="0"
								max="23"
								value={value.hour()}
								onChange={(e) => onChange(value.hour(parseInt(e.target.value) || 0))}
								className="w-14 p-2 text-center bg-brand-bg border border-brand/20 rounded-lg font-mono text-sm focus:border-brand text-page-text outline-none transition-all"
							/>
						</div>
						<span className="text-xl font-bold text-brand/30 mt-4">:</span>
						<div className="text-center">
							<p className="text-[10px] text-page-text/40 uppercase font-bold mb-1">Minutes</p>
							<input
								type="number"
								min="0"
								max="59"
								value={value.minute()}
								onChange={(e) => onChange(value.minute(parseInt(e.target.value) || 0))}
								className="w-14 p-2 text-center bg-brand-bg border border-brand/20 rounded-lg font-mono text-sm focus:border-brand text-page-text outline-none transition-all"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});

DateTimePicker.displayName = 'DateTimePicker';
export default DateTimePicker;
