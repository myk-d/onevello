import { useState } from 'react';
import { UrlConfig } from '../../constants/UrlConfig';
import Button from '../UI/Button';

interface EncryptedMessageLinkProps {
	id: string;
	clearId: () => void;
}

const EncryptedMessageLink: React.FC<EncryptedMessageLinkProps> = ({ id, clearId }) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const copyToClipboard = () => {
		const message = `${window.location.origin}${UrlConfig.secretID.replace(':id', id)}`;
		navigator.clipboard.writeText(message);

		setIsCopied(true);
		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	};

	return (
		<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 ">
			<div className="flex items-center justify-between bg-green-100 py-2 px-3 rounded-md italic text-green-800 border-l-[3px] border-green-800">
				<p className="text-left text-base">
					{window.location.origin}
					{UrlConfig.secretID.replace(':id', id)}
				</p>

				<a href={`${window.location.origin}${UrlConfig.secretID.replace(':id', id)}`} target="_blank" rel="noreferrer">
					<svg width="25px" height="25px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							{' '}
							<path
								d="M12.5 6.25C12.9142 6.25 13.25 5.91421 13.25 5.5C13.25 5.08579 12.9142 4.75 12.5 4.75V6.25ZM20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75C19.0858 11.75 18.75 12.0858 18.75 12.5H20.25ZM19.5 6.25C19.9142 6.25 20.25 5.91421 20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75V6.25ZM15.412 4.75C14.9978 4.75 14.662 5.08579 14.662 5.5C14.662 5.91421 14.9978 6.25 15.412 6.25V4.75ZM20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75C19.0858 4.75 18.75 5.08579 18.75 5.5H20.25ZM18.75 9.641C18.75 10.0552 19.0858 10.391 19.5 10.391C19.9142 10.391 20.25 10.0552 20.25 9.641H18.75ZM20.0303 6.03033C20.3232 5.73744 20.3232 5.26256 20.0303 4.96967C19.7374 4.67678 19.2626 4.67678 18.9697 4.96967L20.0303 6.03033ZM11.9697 11.9697C11.6768 12.2626 11.6768 12.7374 11.9697 13.0303C12.2626 13.3232 12.7374 13.3232 13.0303 13.0303L11.9697 11.9697ZM12.5 4.75H9.5V6.25H12.5V4.75ZM9.5 4.75C6.87665 4.75 4.75 6.87665 4.75 9.5H6.25C6.25 7.70507 7.70507 6.25 9.5 6.25V4.75ZM4.75 9.5V15.5H6.25V9.5H4.75ZM4.75 15.5C4.75 18.1234 6.87665 20.25 9.5 20.25V18.75C7.70507 18.75 6.25 17.2949 6.25 15.5H4.75ZM9.5 20.25H15.5V18.75H9.5V20.25ZM15.5 20.25C18.1234 20.25 20.25 18.1234 20.25 15.5H18.75C18.75 17.2949 17.2949 18.75 15.5 18.75V20.25ZM20.25 15.5V12.5H18.75V15.5H20.25ZM19.5 4.75H15.412V6.25H19.5V4.75ZM18.75 5.5V9.641H20.25V5.5H18.75ZM18.9697 4.96967L11.9697 11.9697L13.0303 13.0303L20.0303 6.03033L18.9697 4.96967Z"
								fill="#015508"
							></path>{' '}
						</g>
					</svg>
				</a>
			</div>

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

				<Button type="button" variant="outline" size="full" onClick={clearId} className="flex-1 gap-2">
					Create Another Secret
				</Button>
			</div>
		</div>
	);
};

export default EncryptedMessageLink;
