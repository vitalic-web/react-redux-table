import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Table.css';
import TableHead from './TableHead';
import TableRow from './TableRow';
import PaginationNumber from './PaginationNumber';
import Search from './Search';

function Table() {
  const tableData = useSelector(state => state.data.dataMain);
  const tableDataPagination = useSelector(state => state.data.dataPagination);
  const tableDataPages = useSelector(state => state.data.dataPages);
  const tableDataSearch = useSelector(state => state.data.dataSearch);
  const dispatch = useDispatch();
  const filterByAscending = useSelector(state => state.filters.sortByAscending);
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);

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
    let end = parseInt(e.target.innerText) * 25;
    dispatch({ type: 'data/pagination', payload: [start, end] });
  }

  // поиск по ключевому слову
  const search = e => {
    e.preventDefault();
    dispatch({ type: 'data/search', payload: searchWord });
    setIsSearch(true);
  }

  return (
    <div>
      {
        tableDataPagination.length
          ?
          <>
            <Search
              search={search}
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              setIsSearch={setIsSearch}
            />
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
                {isSearch
                  ?
                  tableDataSearch.map((tableDataItem, index) => {
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
                  })
                  :
                  tableDataPagination.map((tableDataItem, index) => {
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