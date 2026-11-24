export const SecretIDLoader = () => {
	return (
		<section className="mx-auto flex w-full max-w-[680px] flex-col gap-5 px-4 py-8 md:py-14" role="status" aria-busy="true">
			<div className="ov-card">
				<div className="ov-skeleton" aria-hidden="true">
					<i style={{ height: 44 }} />
					<i style={{ height: 44 }} />
					<i style={{ height: 14, width: '60%' }} />
				</div>
			</div>
		</section>
	);
};
