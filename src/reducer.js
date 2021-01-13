import axios from 'axios';
import { API_DATA } from './config';

const initialState = {
  data: {
    dataMain: [],
    dataPagination: [],
    dataPages: [],
    dataSearch: [],
  },
  filters: {
    id: {
      idUp: false,
      idDown: false,
    },
    firstName: {
      firstNameUp: false,
      firstNameDown: false,
    },
    lastName: {
      lastNameUp: false,
      lastNameDown: false,
    },
    email: {
      emailUp: false,
      emailDown: false,
    },
    phone: {
      phoneUp: false,
      phoneDown: false,
    },
    city: {
      cityUp: false,
      cityDown: false,
    }
  }
}

// функция загрузки данных с сервера
export async function fetchData(dispatch) {
  const res = await axios.get(API_DATA);

  dispatch({ type: 'data/dataLoaded', payload: res.data });
}

// массив для номеров страниц пагинации
const numArr = num => {
  const arr = [];

  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }

  return arr;
}

// фильтр по ключевому слову
const searchFilter = (arr, searchWord) => {
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

// сортировка по возрастанию
const sortByAscending = (data, column) => {
  switch (column) {
    case 'Номер': {
      return data.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      })
    }
    case 'Имя': {
      return data.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      })
    }
    case 'Фамилия': {
      return data.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
      })
    }
    case 'Email': {
      return data.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      })
    }
    case 'Телефон': {
      return data.sort((a, b) => {
        if (a.phone < b.phone) return -1;
        if (a.phone > b.phone) return 1;
        return 0;
      })
    }
    case 'Город': {
      return data.sort((a, b) => {
        if (a.adress.city < b.adress.city) return -1;
        if (a.adress.city > b.adress.city) return 1;
        return 0;
      })
    }
    default:
      return data;
  }
};

// сортировка по убыванию
const sortByDescending = (data, column) => {
  switch (column) {
    case 'Номер': {
      return data.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      })
    }
    case 'Имя': {
      return data.sort((a, b) => {
        if (a.firstName > b.firstName) return -1;
        if (a.firstName < b.firstName) return 1;
        return 0;
      })
    }
    case 'Фамилия': {
      return data.sort((a, b) => {
        if (a.lastName > b.lastName) return -1;
        if (a.lastName < b.lastName) return 1;
        return 0;
      })
    }
    case 'Email': {
      return data.sort((a, b) => {
        if (a.email > b.email) return -1;
        if (a.email < b.email) return 1;
        return 0;
      })
    }
    case 'Телефон': {
      return data.sort((a, b) => {
        if (a.phone > b.phone) return -1;
        if (a.phone < b.phone) return 1;
        return 0;
      })
    }
    case 'Город': {
      return data.sort((a, b) => {
        if (a.adress.city > b.adress.city) return -1;
        if (a.adress.city < b.adress.city) return 1;
        return 0;
      })
    }
    default:
      return data;
  }
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/dataLoaded': { // загрузка данных с сервера
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataMain: action.payload,
          dataPagination: action.payload.slice(0, 25),
          dataPages: numArr(Math.ceil(action.payload.length / 25)),
        }
      }))
    }
    case 'data/pagination': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: state.data.dataMain.slice(action.payload[0], action.payload[1]),
        }
      }))
    }
    case 'data/search': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataSearch: searchFilter(state.data.dataMain, action.payload),
        }
      }))
    }
    case 'data/sortIdUp': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          id: {
            ...state.filters.id,
            idUp: true,
            idDown: false,
          }
        },
      }))
    }
    case 'data/sortIdDown': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          id: {
            ...state.filters.id,
            idUp: false,
            idDown: true,
          }
        },
      }))
    }
    case 'data/sortFirstNameUp': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          firstName: {
            ...state.filters.firstName,
            firstNameUp: true,
            firstNameDown: false,
          }
        },
      }))
    }
    case 'data/sortFirstNameDown': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          firstName: {
            ...state.filters.firstName,
            firstNameUp: false,
            firstNameDown: true,
          }
        },
      }))
    }
    case 'data/sortLastNameUp': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          email: '',
          phone: '',
          city: '',
          lastName: {
            ...state.filters.lastName,
            lastNameUp: true,
            lastNameDown: false,
          }
        },
      }))
    }
    case 'data/sortLastNameDown': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          email: '',
          phone: '',
          city: '',
          lastName: {
            ...state.filters.lastName,
            lastNameUp: false,
            lastNameDown: true,
          }
        },
      }))
    }
    case 'data/sortEmailUp': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          email: {
            ...state.filters.email,
            emailUp: true,
            emailDown: false,
          }
        },
      }))
    }
    case 'data/sortEmailDown': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          email: {
            ...state.filters.email,
            emailUp: false,
            emailDown: true,
          }
        },
      }))
    }
    case 'data/sortPhoneUp': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          phone: {
            ...state.filters.phone,
            phoneUp: true,
            phoneDown: false,
          }
        },
      }))
    }
    case 'data/sortPhoneDown': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          phone: {
            ...state.filters.phone,
            phoneUp: false,
            phoneDown: true,
          }
        },
      }))
    }
    case 'data/sortCityUp': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: {
            ...state.filters.city,
            cityUp: true,
            cityDown: false,
          }
        },
      }))
    }
    case 'data/sortCityDown': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: {
            ...state.filters.city,
            cityUp: false,
            cityDown: true,
          }
        },
      }))
    }
    default:
      return state;
  }
};
