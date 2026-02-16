import React from 'react';

const Skeleton = ({ className, variant = 'rect' }) => {
    const baseClasses = "bg-gray-200 dark:bg-gray-800 animate-pulse";
    const variants = {
        circle: "rounded-full",
        rect: "rounded-md",
        text: "rounded h-4 w-full"
    };

    return (
        <div className={`${baseClasses} ${variants[variant] || ''} ${className}`}></div>
    );
};

export const ProductSkeleton = () => (
    <div className="flex flex-col gap-4">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
        </div>
    </div>
);

export const ProductPageSkeleton = () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Gallery Skeleton */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="hidden lg:flex flex-col gap-4 w-20">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-square rounded-lg" />)}
            </div>
            <div className="flex-1 aspect-[4/5] rounded-2xl overflow-hidden relative">
                <Skeleton className="w-full h-full" />
            </div>
        </div>

        {/* Details Skeleton */}
        <div className="mt-10 lg:mt-0 space-y-6">
            <Skeleton variant="text" className="h-10 w-3/4" />
            <div className="flex items-center gap-4">
                <Skeleton variant="text" className="w-32" />
                <Skeleton variant="text" className="w-20" />
            </div>
            <Skeleton variant="text" className="h-12 w-40" />
            <div className="border-t border-gray-200 dark:border-gray-800 my-8"></div>
            <div className="space-y-4">
                <Skeleton variant="text" className="w-24" />
                <div className="flex gap-4"><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-10 w-10 rounded-full" /></div>
            </div>
            <div className="space-y-4">
                <Skeleton variant="text" className="w-24" />
                <div className="flex gap-4"><Skeleton className="h-12 w-16" /><Skeleton className="h-12 w-16" /><Skeleton className="h-12 w-16" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
            </div>
        </div>
    </div>
);

export default Skeleton;
