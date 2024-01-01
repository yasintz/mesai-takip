import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './useStore';
import { Item } from './components/Item/Item';
import { MonthList } from './components/Month/List';
import 'dayjs/locale/tr';
import { routePaths } from './utils/routes';
import { itemPriceCalculator } from './utils/calc';
// import styles from 'src/pages/Home/style.module.scss';

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
  const navigate = useNavigate();
  const { items, prices } = useStore();

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

  const totalMinutes = listItems
    .map((i) => i.hour * 60 + i.minute)
    .reduce((acc, res) => acc + res, 0);

  const totalPrice = Math.round(
    listItems
      .map((i) => itemPriceCalculator(i, prices))
      .reduce((acc, res) => acc + res, 0)
  );

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;

  return (
    <>
      <MonthList
        months={months}
        onClick={setActiveMonthId}
        activeMonthId={activeMonthId}
      />
      <div className="total-text">
        Toplam {hours} saat {minutes} dakika → {totalPrice} TL
      </div>

      <div className="hide-scrollbar item-list">
        {listItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onItemClick={() => navigate(routePaths.edit(item.id))}
            prices={prices}
          />
        ))}
      </div>
    </>
  );
}

export default App;
