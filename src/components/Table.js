import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Table.css';
import TableHead from './TableHead';
import TableRow from './TableRow';
import PaginationNumber from './PaginationNumber';
import Search from './Search';
import UserInfo from './UserInfo';

function Table() {
  const tableData = useSelector(state => state.data.dataMain);
  const tableDataPagination = useSelector(state => state.data.dataPagination);
  const tableDataPages = useSelector(state => state.data.dataPages);
  const tableDataSearch = useSelector(state => state.data.dataSearch);
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [userCard, setUserCard] = useState('');

  // сортировка по возрастанию/убыванию
  const sortById = e => {
    if (!filters.id.idUp) {
      dispatch({ type: 'data/sortIdUp', payload: e.target.innerText });
    }

    if (filters.id.idUp) {
      dispatch({ type: 'data/sortIdDown', payload: e.target.innerText });
    }
  }

  const sortByFirstName = e => {
    if (!filters.firstName.firstNameUp) {
      dispatch({ type: 'data/sortFirstNameUp', payload: e.target.innerText });
    }

    if (filters.firstName.firstNameUp) {
      dispatch({ type: 'data/sortFirstNameDown', payload: e.target.innerText });
    }
  }

  const sortByLastName = e => {
    if (!filters.lastName.lastNameUp) {
      dispatch({ type: 'data/sortLastNameUp', payload: e.target.innerText });
    }

    if (filters.lastName.lastNameUp) {
      dispatch({ type: 'data/sortLastNameDown', payload: e.target.innerText });
    }
  }

  const sortByEmail = e => {
    if (!filters.email.emailUp) {
      dispatch({ type: 'data/sortEmailUp', payload: e.target.innerText });
    }

    if (filters.email.emailUp) {
      dispatch({ type: 'data/sortEmailDown', payload: e.target.innerText });
    }
  }

  const sortByPhone = e => {
    if (!filters.phone.phoneUp) {
      dispatch({ type: 'data/sortPhoneUp', payload: e.target.innerText });
    }

    if (filters.phone.phoneUp) {
      dispatch({ type: 'data/sortPhoneDown', payload: e.target.innerText });
    }
  }

  const sortByCity = e => {
    if (!filters.city.cityUp) {
      dispatch({ type: 'data/sortCityUp', payload: e.target.innerText });
    }

    if (filters.city.cityUp) {
      dispatch({ type: 'data/sortCityDown', payload: e.target.innerText });
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
    setUserCard('');
    dispatch({ type: 'data/search', payload: searchWord });
    setIsSearch(true);
  }

  // показ выбранного юзера
  const showUserCard = e => {
    const currentUser = (JSON.parse(JSON.stringify(e.target.parentNode.innerText))).split('\t');

    setUserCard(tableDataPagination.find(user => parseInt(user.id) === parseInt(currentUser[0])));
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
              setUserCard={setUserCard}
            />
            <div>
              {filters.id.idUp && ' ННН '}
              {filters.id.idDown && ' ннн '}
            </div>
            <div>
              {filters.firstName.firstNameUp && ' ИИИ '}
              {filters.firstName.firstNameDown && ' иии '}
            </div>
            <div>
              {filters.lastName.lastNameUp && ' ФФФ '}
              {filters.lastName.lastNameDown && ' ффф '}
            </div>
            <div>
              {filters.email.emailUp && ' EEE '}
              {filters.email.emailDown && ' eee '}
            </div>
            <div>
              {filters.phone.phoneUp && ' ТТТ '}
              {filters.phone.phoneDown && ' ттт '}
            </div>
            <div>
              {filters.city.cityUp && ' ГГГ '}
              {filters.city.cityDown && ' ггг '}
            </div>
            <table className="Table">
              <thead>
                <TableHead
                  sortByNumber={sortById}
                  sortByName={sortByFirstName}
                  sortByLastName={sortByLastName}
                  sortByEmail={sortByEmail}
                  sortByPhone={sortByPhone}
                  sortByCity={sortByCity}
                  number="Номер"
                  name="Имя"
                  lastName="Фамилия"
                  email="Email"
                  phone="Телефон"
                  adress="Город"
                  description="Описание"
                />
              </thead>
              <tbody>
                {isSearch
                  ?
                  tableDataSearch.map((tableDataItem, index) => {
                    return (
                      <TableRow
                        showUserCard={showUserCard}
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
                        showUserCard={showUserCard}
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
              {!isSearch && tableDataPages.map((pageNumber, index) => {
                return (
                  <PaginationNumber
                    key={index}
                    number={pageNumber}
                    paginate={paginate}
                  />
                )
              })}
            </div>
            {userCard &&
              <UserInfo
                firstName={userCard.firstName}
                description={userCard.description}
                streetAddress={userCard.adress.streetAddress}
                city={userCard.adress.city}
                state={userCard.adress.state}
                zip={userCard.adress.zip}
              />}

          </>
          :
          <div>is loading ....................</div>
      }
    </div>
  )
}

export default Table;