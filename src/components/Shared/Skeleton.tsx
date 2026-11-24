import { cn } from '../../utils/cn';

interface SkeletonProps {
	className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
	return <div className={cn('animate-pulse rounded-md bg-surface-sunken', className)} />;
};

export default Skeleton;
