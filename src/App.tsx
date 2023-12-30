import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore, ItemType } from './useStore';
import { Item } from './components/Item/Item';
import { ItemEditCreate } from './components/ItemCreateEdit/ItemCreateEdit';
import 'dayjs/locale/tr';
import { MonthList } from './components/Month/List';

dayjs.locale('tr');

const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeMonth, setActiveMonth] = useState(() => new Date().getMonth());
  const { items, addItem, updateItem, removeItem } = useStore();

  const listItems = useMemo(() => {
    const monthStart = dayjs().set('month', activeMonth).startOf('month');
    const monthEnd = monthStart.endOf('month');

    const startTime = monthStart.toDate().getTime();
    const endTime = monthEnd.toDate().getTime();
    return items
      .filter((i) => {
        const itemDate = dayjs(i.date).toDate().getTime();

        return itemDate >= startTime && itemDate <= endTime;
      })
      .sort((a, b) => dayjs(a.date).diff(b.date));
  }, [activeMonth, items]);

  const selectedItemId = searchParams.get('item');
  const showCreateModal = Boolean(searchParams.get('showCreate'));
  const selectedItem = items.find((i) => i.id === selectedItemId);

  const setShowCreateModal = (bool: boolean) =>
    setSearchParams((prev) => ({
      ...prev,
      showCreate: bool ? 'true' : '',
    }));

  const saveItem = (item: Omit<ItemType, 'id'>) => {
    if (selectedItemId) {
      updateItem(selectedItemId, item);
    } else {
      addItem({
        id: Math.random().toString(36).substring(2, 7),
        ...item,
      });
    }

    setShowCreateModal(false);
    setSearchParams((prev) => ({
      ...prev,
      item: '',
    }));
  };

  const totalMinutes = listItems
    .map((i) => i.hour * 60 + i.minute)
    .reduce((acc, res) => acc + res, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;

  if (showCreateModal || selectedItem) {
    return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column' }}>
        <ItemEditCreate
          key={selectedItem?.id}
          item={selectedItem}
          onSave={saveItem}
        />
        {selectedItemId && (
          <button
            className="button danger"
            style={{ marginTop: 12 }}
            onClick={() => {
              setSearchParams((prev) => ({
                ...prev,
                item: '',
              }));
              setTimeout(() => {
                removeItem(selectedItemId);
              }, 0);
            }}
          >
            Sil
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ height: '100%' }}>
        <button
          className="button"
          style={{ width: 'calc(100% - 32px)', margin: 16 }}
          onClick={() => setShowCreateModal(true)}
        >
          Ekle
        </button>

        <MonthList
          months={months}
          onClick={setActiveMonth}
          activeMonthIndex={activeMonth}
        />
        <div className="mb-3 pl-4 pr-4">
          Toplam {hours} saat {minutes} dakika
        </div>

        <div
          style={{
            padding: '0 16px',
            overflowY: 'scroll',
            height: 'calc(100% - 50px)',
          }}
        >
          {listItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              active={selectedItemId === item.id}
              onItemClick={() =>
                setSearchParams((prev) => ({ ...prev, item: item.id }))
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
