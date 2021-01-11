import { useSelector, useDispatch } from 'react-redux';
import TableHead from './TableHead';
import TableRow from './TableRow';
import './Table.css';

function Table() {
  const tableData = useSelector(state => state.data);
  const dispatch = useDispatch();

  const filterByAscending = useSelector(state => state.filters.sortByAscending);

  console.log('filtersByAscending', filterByAscending);

  const sort = () => {
    if (!filterByAscending) {
      dispatch({ type: 'data/sortByAscending' });
    } else {
      dispatch({ type: 'data/sortByDescending' });
    }
  }

  return (
    <div>
      <table className="Table">
        <thead>
          <TableHead
            sort={sort}
            number="Номер"
            name="Имя"
            lastName="Фамилия"
            email="Email"
            phone="Телефон"
            adress="Адрес"
            description="Описание"
          />
        </thead>
        <tbody>
          {tableData.map(tableDataItem =>
            <TableRow
              key={tableDataItem.id}
              number={tableDataItem.id}
              name={tableDataItem.firstName}
              lastName={tableDataItem.lastName}
              email={tableDataItem.email}
              phone={tableDataItem.phone}
              adress={tableDataItem.adress.city}
              description={tableDataItem.description}
            />
          )}
        </tbody>
      </table>
    </div>

  )
}

export default Table;