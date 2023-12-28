import { useEffect, useRef } from 'react';
import './month.scss';

type MonthProps = {
  month: string;
  onClick: () => void;
  isActive: boolean;
};

export const Month = ({ month, onClick, isActive }: MonthProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ block: 'center' });
    }
  }, [isActive]);

  return (
    <div
      key={month}
      onClick={onClick}
      ref={ref}
      className="month-item"
      style={{
        borderRadius: 6,
        backgroundColor: 'white',
        color: '#6b6d78',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isActive && {
          color: 'white',
          backgroundColor: '#ff543d',
        }),
      }}
    >
      {month}
    </div>
  );
};
