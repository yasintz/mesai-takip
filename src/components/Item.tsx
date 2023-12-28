import React from 'react';
import dayjs from 'dayjs';
import { ItemType } from '../useStore';
import { dayColors } from '../colors';
import cx from 'classnames';

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

function getTimeTextImage(item: ItemType) {
  return (item.hour + item.minute / 60).toFixed(1);
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
  const timeText = getTimeTextImage(item);

  const dateInstance = React.useMemo(() => dayjs(item.date), [item.date]);

  const day = React.useMemo(
    () => dateInstance.format('DD MMMM, dddd'),
    [dateInstance]
  );

  const date = React.useMemo(() => dateInstance.format('dddd'), [dateInstance]);

  return (
    <div>
      <div className={cx('item-container', { active })} onClick={onItemClick}>
        <div
          className="item-image"
          style={{ backgroundColor: dayColors[date], display: 'none' }}
        >
          {timeText}
        </div>
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
            <div style={{ fontWeight: 600, color: '#313c47' }}>{day}</div>

            <div
              style={{
                color: '#616161',
                fontSize: '1.02rem',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              {getTimeText(item)}
            </div>
          </div>
          <div
            style={{
              display: 'table',
              tableLayout: 'fixed',
              width: '100%',
            }}
          >
            <div
              className="text-overflow"
              style={{
                display: 'table-cell',
                color: item.note ? undefined : 'gray',
                fontWeight: item.note ? undefined : 200,
              }}
            >
              {item.note || 'Not eklemediniz...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
