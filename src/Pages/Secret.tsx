import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import DateTimePicker from '../components/UI/DateTimePicker';

const Secret = () => {
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

	const handleDateChange = (newDate: Dayjs) => {
		setSelectedDate(newDate);
		// Тут можна відправити дані на бекенд або виконати іншу логіку
		console.log('Selected JS Date:', newDate.toDate());
		console.log('Formatted for API:', newDate.toISOString());
	};

	return (
		<>
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 h-[70dvh]">
				<div className="border w-full max-w-5xl rounded-2xl py-5 px-7">
					{/* textarea */}
					<textarea className="w-full border rounded-xl p-4" placeholder="some secret text here..."></textarea>

					{/* passphrase */}
					<div></div>

					{/* one time access */}
					<div>
						<div></div>
						<div>
							<label className="block text-sm font-bold mb-2 uppercase tracking-wider">Expiration Date</label>

							<DateTimePicker value={selectedDate} onChange={handleDateChange} dateFormat="DD.MM.YYYY - HH:mm" />

							<p className="mt-4 text-sm text-gray-500">Raw value: {selectedDate.format()}</p>
						</div>
					</div>

					{/* buttons */}
					<div></div>
				</div>
			</section>
		</>
	);
};

export default Secret;
