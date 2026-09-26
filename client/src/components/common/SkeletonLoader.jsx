import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-white/5 border border-white/5 rounded-lg shimmer-wave ${className}`}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-4 border-t border-white/5 flex justify-between">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
};

export default Skeleton;
