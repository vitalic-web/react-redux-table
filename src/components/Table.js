import { useSelector, useDispatch } from 'react-redux';
import './Table.css';
import TableHead from './TableHead';
import TableRow from './TableRow';
import PaginationNumber from './PaginationNumber';

function Table() {
  const tableData = useSelector(state => state.data.dataMain);
  const tableDataPagination = useSelector(state => state.data.dataPagination);
  const tableDataPages = useSelector(state => state.data.dataPages);
  const dispatch = useDispatch();
  const filterByAscending = useSelector(state => state.filters.sortByAscending);

  // console.log(tableData);

  const testState = [
    {
      id: 534,
      firstName: "Anteria",
      lastName: "Mazza",
      email: "ABerry@sit.ly",
      phone: "(877)851-7080",
      adress: {
        streetAddress: "5261 Sed Rd",
        city: "Fort Hood",
        state: "MT",
        zip: "49213"
      },
      description: "sapien turpis sollicitudin id sed massa orci sit lacus quis aliquam odio sapien amet curabitur porta nec magna dolor pulvinar neque magna vel sollicitudin dolor placerat ac etiam sollicitudin vel nec sed"
    },
    {
      id: 219,
      firstName: "Bartley",
      lastName: "Brittin",
      email: "JWing@at.org",
      phone: "(132)168-9837",
      adress: {
        streetAddress: "2399 Massa Dr",
        city: "Saskatoon",
        state: "NJ",
        zip: "26540"
      },
      description: "tincidunt sed neque porttitor porta aliquam non mattis nec amet consectetur hendrerit sollicitudin elementum sollicitudin eget et nec sollicitudin scelerisque pulvinar aenean at lectus nunc placerat molestie etiam etiam augue ante quis"
    },
    {
      id: 253,
      firstName: "Asif",
      lastName: "Peschke",
      email: "DTravis@pharetra.com",
      phone: "(788)008-8179",
      adress: {
        streetAddress: "6811 Odio Ct",
        city: "Saskatoon",
        state: "NC",
        zip: "43682"
      },
      description: "vel vitae tincidunt dolor eget odio at et velit lectus orci placerat tortor vitae dui sed adipiscing vestibulum dolor vestibulum id rutrum in eros ipsum vitae sapien dolor mattis porttitor sit sapien"
    },
  ]

  console.log(testState);

  const testFilter = (arr, searchWord) => {
    const newArr = [];

    arr.forEach(item => {
      for (let key in item) {
        if (item[key].toString().includes(searchWord)) {
          newArr.push(item);
        } else for (let key2 in item[key]) {
          if (item[key][key2].toString().includes(searchWord)) {
            newArr.push(item);
          }
        }
      }
    })

    return newArr;
  }

  const testArr = testFilter(testState, 'Saskatoon');

  console.log(testArr);

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