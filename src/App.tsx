import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore, ItemType } from './useStore';
import { Item } from './components/Item/Item';
import { ItemEditCreate } from './components/ItemCreateEdit/ItemCreateEdit';
import 'dayjs/locale/tr';
import { MonthList } from './components/Month/List';

dayjs.locale('tr');

const months = (() => {
  const now = dayjs().startOf('month');

  const range = [-2, -1, 0, 1];

  const monthList = range.map((i) => {
    const date = now.add(i, 'month');
    return {
      id: i,
      name: date.format('MMMM'),
      date,
    };
  });

  return monthList;
})();

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, addItem, updateItem, removeItem } = useStore();

  const [activeMonthId, setActiveMonthId] = useState(0);
  const activeMonth = useMemo(
    () => months.find((i) => i.id === activeMonthId),
    [activeMonthId]
  );

  const listItems = useMemo(() => {
    const monthStart = activeMonth?.date || dayjs();
    const monthEnd = monthStart.endOf('month');

    const startTime = monthStart.toDate().getTime();
    const endTime = monthEnd.toDate().getTime();
    return items
      .filter((i) => {
        const itemDate = dayjs(i.date).toDate().getTime();

        return itemDate >= startTime && itemDate <= endTime;
      })
      .sort((a, b) => dayjs(b.date).diff(a.date));
  }, [activeMonth?.date, items]);

  const selectedItemId = searchParams.get('item');
  const showCreateModal = Boolean(searchParams.get('showCreate'));
  const selectedItem = items.find((i) => i.id === selectedItemId);

  const setShowCreateModal = () =>
    setSearchParams((prev) => ({
      ...prev,
      showCreate: 'true',
    }));

  const closeModal = () => {
    setSearchParams((prev) => {
      prev.delete('item');
      prev.delete('showCreate');
      return { ...prev };
    });
  };

  const saveItem = (item: Omit<ItemType, 'id'>) => {
    if (selectedItemId) {
      updateItem(selectedItemId, item);
    } else {
      addItem({
        id: Math.random().toString(36).substring(2, 7),
        ...item,
      });
    }

    closeModal();
  };

  const onRemove = () => {
    closeModal();
    setTimeout(() => {
      removeItem(selectedItemId!);
    }, 0);
  };

  const totalMinutes = listItems
    .map((i) => i.hour * 60 + i.minute)
    .reduce((acc, res) => acc + res, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;

  if (showCreateModal || selectedItem) {
    return (
      <>
        <div className="page-container">
          <ItemEditCreate
            key={selectedItem?.id}
            item={selectedItem}
            onSave={saveItem}
            onCancel={closeModal}
            onRemove={selectedItemId ? onRemove : undefined}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-container">
        <button className="button" onClick={setShowCreateModal}>
          + Ekle
        </button>

        <MonthList
          months={months}
          onClick={setActiveMonthId}
          activeMonthId={activeMonthId}
        />
        <div className='total-text'>
          Toplam {hours} saat {minutes} dakika
        </div>

        <div
          style={{
            overflowY: 'scroll',
            height: '100%',
          }}
          className="hide-scrollbar item-list"
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
