import React from 'react';

interface Props {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-8">
      <div 
        className="bg-blue-600 h-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};