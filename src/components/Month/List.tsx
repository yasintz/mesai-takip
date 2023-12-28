import cx from 'classnames';
import styles from './style.module.scss';

import { Month } from '.';

type MonthListProps = {
  months: string[];
  onClick: (index: number) => void;
  activeMonthIndex: number;
};

export const MonthList = ({
  months,
  activeMonthIndex,
  onClick,
}: MonthListProps) => {
  return (
    <div className={cx('hide-scrollbar', styles.listContainer)}>
      {months.map((month, index) => (
        <Month
          key={month}
          month={month}
          onClick={() => onClick(index)}
          isActive={index === activeMonthIndex}
        />
      ))}
    </div>
  );
};
