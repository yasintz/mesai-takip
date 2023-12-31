import React from 'react';
import dayjs from 'dayjs';
import { ItemType } from 'src/useStore';
import cx from 'classnames';
import styles from './styles.module.scss';

function getTimeText(item: ItemType) {
  if (item.minute && item.hour) {
    return `${item.hour} saat ${item.minute} dakika`;
  }

  if (item.hour) {
    return `${item.hour} saat`;
  }
  if (item.minute) {
    return `${item.minute} dakika`;
  }
}

export function Item({
  item,
  active,
  onItemClick,
}: {
  item: ItemType;
  active?: boolean;
  onItemClick: () => void;
}) {
  const dateInstance = React.useMemo(() => dayjs(item.date), [item.date]);

  const day = React.useMemo(
    () => dateInstance.format('DD MMMM, dddd'),
    [dateInstance]
  );

  return (
    <div>
      <div
        className={cx('item-container', styles.container, { active })}
        onClick={onItemClick}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <div className={styles.title}>{day}</div>

            <div className={styles.subtitle}>{getTimeText(item)}</div>
          </div>
          <div
            style={{
              display: 'table',
              tableLayout: 'fixed',
              width: '100%',
            }}
          >
            <div className={cx('text-overflow', styles.note)}>
              {item.note || 'Not eklemediniz...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
