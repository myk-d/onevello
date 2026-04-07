import Skeleton from '../Shared/Skeleton';

export const SecretIDLoader = () => {
	return (
		<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
			<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4">
				<Skeleton className="h-11 w-full rounded-xl" />

				<div className="flex justify-between gap-6">
					<Skeleton className="h-12 flex-1 rounded-md" />

					<Skeleton className="h-12 flex-1 rounded-xl" />
				</div>
			</div>
		</section>
	);
};
