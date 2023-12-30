import { useState } from 'react';
import cx from 'classnames';
import Calendar from 'react-calendar';
import { ItemType } from 'src/useStore';
import { YesNoToggle } from '../YesNoToggle/YesNoToggle';
import styles from './style.module.scss';

export function ItemEditCreate({
  item,
  onSave,
}: {
  item?: ItemType;
  onSave: (item: Omit<ItemType, 'id'>) => void;
}) {
  const [data, setData] = useState({
    ...item,
    date: item?.date || new Date().toISOString(),
  } as ItemType);

  const onChange = (key: keyof ItemType) => (params: any) =>
    setData((prev) => ({ ...prev, [key]: params }));

  const onInputChange =
    (key: keyof ItemType, checkbox?: boolean) => (ev: any) =>
      setData((prev) => ({
        ...prev,
        [key]: checkbox ? ev.target.checked : ev.target.value,
      }));

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="input">
          <span>Saat</span>
          <input
            value={data.hour}
            onChange={onInputChange('hour')}
            placeholder="00"
            type="number"
          />
        </div>
        <div className="input">
          <span>Dakika</span>
          <input
            value={data.minute}
            onChange={onInputChange('minute')}
            placeholder="00"
            type="number"
          />
        </div>
      </div>

      <div className="input" style={{ margin: '16px 0' }}>
        <span>Not</span>
        <textarea
          value={data.note}
          onChange={onInputChange('note')}
          placeholder="Notunuzu ekleyiniz..."
          rows={3}
        />
      </div>

      <Calendar onChange={onChange('date')} value={data.date} locale="tr-TR" />

      <YesNoToggle
        title="Bugun Resmi bir tatil mi?"
        status={Boolean(data.isPublicHoliday)}
        onChange={onChange('isPublicHoliday')}
        className={cx('mt-3')}
      />

      <button
        className={cx('button')}
        style={{ marginTop: 24 }}
        onClick={() =>
          onSave({
            hour: parseFloat(data.hour?.toString() || '0'),
            minute: parseFloat(data.minute?.toString() || '0'),
            note: data.note || '',
            date: new Date(data.date).toISOString(),
          })
        }
      >
        Kaydet
      </button>
    </div>
  );
}
