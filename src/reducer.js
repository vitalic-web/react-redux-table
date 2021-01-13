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
    sortByAscending: false
  }
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
    case 'Адрес': {
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
    case 'Адрес': {
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

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/sortByAscending': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          sortByAscending: true,
        },
      }))
    }
    case 'data/sortByDescending': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByDescending(state.data.dataPagination, action.payload),
        },
        filters: {
          ...state.filters,
          sortByAscending: false,
        },
      }))
    }
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
    default:
      return state;
  }
};

// функция загрузки данных с сервера
export async function fetchData(dispatch) {
  const res = await axios.get(API_DATA);

  dispatch({ type: 'data/dataLoaded', payload: res.data });
}