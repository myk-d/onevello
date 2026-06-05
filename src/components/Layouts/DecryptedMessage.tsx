import { Button } from 'perkslab-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import { cn } from '../../utils/cn';

interface DecryptedMessageProps {
	message: string;
	isOneTime?: boolean;
}

const DecryptedMessage: React.FC<DecryptedMessageProps> = ({ message, isOneTime }) => {
	const navigate = useNavigate();

	const [isCopied, setIsCopied] = useState<boolean>(false);

	const navigateToCreateSecret = () => {
		navigate(UrlConfig.secret);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(message);

		setIsCopied(true);
		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	};

	return (
		<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 ">
			<div className="flex-1 flex flex-col items-start">
				<label className="block text-sm font-bold mb-2 uppercase tracking-wider">Secret text</label>
				<textarea
					className={cn('w-full border rounded-xl p-4 resize-none')}
					rows={20}
					value={message}
					readOnly
					placeholder="some secret text here"
				></textarea>
			</div>

			{isOneTime && (
				<div className="bg-cyan-100 py-2 px-3 rounded-md italic text-cyan-800 border-l-[3px] border-cyan-800">
					<p className="text-left text-sm">This message is one-time access and will self-destruct after being viewed.</p>
				</div>
			)}

			{isOneTime && (
				<div className="bg-rose-100 py-2 px-3 rounded-md italic text-rose-800 border-l-[3px] border-cyan-800">
					<p className="text-left text-sm">You can close this window when done.</p>
				</div>
			)}

			{/* buttons */}
			<div className="flex justify-between gap-6 flex-wrap">
				{isCopied ? (
					<Button type="button" variant="success" size="full" className="flex-1 gap-2">
						Copied
					</Button>
				) : (
					<Button type="button" variant="default" size="full" onClick={copyToClipboard} className="flex-1 gap-2">
						Copy to clipboard
						<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								{' '}
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
									fill="#fff"
								></path>{' '}
								<path
									d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
									fill="#fff"
								></path>{' '}
							</g>
						</svg>
					</Button>
				)}

				<Button type="button" variant="outline" size="full" onClick={navigateToCreateSecret} className="flex-1 gap-2">
					Create Secret
				</Button>
			</div>
		</div>
	);
};

export default DecryptedMessage;
