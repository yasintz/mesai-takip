import { useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './style.module.scss';

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
      className={cx(styles.container, isActive && styles.active)}
    >
      {month}
    </div>
  );
};
