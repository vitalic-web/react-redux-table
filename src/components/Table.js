import { useSelector, useDispatch } from 'react-redux';
import './Table.css';
import TableHead from './TableHead';
import TableRow from './TableRow';
import PaginationNumber from './PaginationNumber';

function Table() {
  const tableData = useSelector(state => state.data);
  const tableDataPagination = useSelector(state => state.dataPagination);
  const tableDataPages = useSelector(state => state.dataPages);
  const dispatch = useDispatch();
  const filterByAscending = useSelector(state => state.filters.sortByAscending);

  // сортировка по возрастанию/убыванию
  const sort = () => {
    if (!filterByAscending) {
      dispatch({ type: 'data/sortByAscending' });
    } else {
      dispatch({ type: 'data/sortByDescending' });
    }
  }

  // пагинация
  const paginate = (e) => {
    let start = (parseInt(e.target.innerText) - 1) * 25;
    let end = parseInt(e.target.innerText) * 25 - 1;
    dispatch({ type: 'data/pagination', payload: [start, end] });
  }

  return (
    <div>
      {
        tableDataPagination.length
          ?
          <>
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
                {tableDataPagination.map((tableDataItem, index) => {
                  return (
                    <TableRow
                      key={index}
                      number={tableDataItem.id}
                      name={tableDataItem.firstName}
                      lastName={tableDataItem.lastName}
                      email={tableDataItem.email}
                      phone={tableDataItem.phone}
                      adress={tableDataItem.adress.city}
                    // description={tableDataItem.description}
                    />
                  )
                })}
              </tbody>
            </table>
            <div className="Table__pagination-number">
              {tableDataPages.map((pageNumber, index) => {
                return (
                  <PaginationNumber
                    key={index}
                    number={pageNumber}
                    paginate={paginate}
                  />
                )
              })}
            </div>
          </>
          :
          <div>is loading ....................</div>
      }
    </div>
  )
}

export default Table;