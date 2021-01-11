import { useSelector, useDispatch } from 'react-redux';
import TableHead from './TableHead';
import TableRow from './TableRow';
import './Table.css';

function Table() {
  const tableData = useSelector(state => state.data);
  const dispatch = useDispatch();

  const filterByAscending = useSelector(state => state.filters.sortByAscending);

  const sort = () => {
    if (!filterByAscending) {
      dispatch({ type: 'data/sortByAscending' });
    } else {
      dispatch({ type: 'data/sortByDescending' });
    }
  }

  return (
    <div>
      {
        tableData.length
          ?
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
              {tableData.map((tableDataItem, index) => {
                return (
                  <TableRow
                    key={index}
                    number={tableDataItem.id}
                    name={tableDataItem.firstName}
                    lastName={tableDataItem.lastName}
                    email={tableDataItem.email}
                    phone={tableDataItem.phone}
                    adress={tableDataItem.adress.city}
                    description={tableDataItem.description}
                  />
                )
              })
              }
            </tbody>
          </table>
          :
          <div>is loading ....................</div>
      }
    </div>
  )
}

export default Table;