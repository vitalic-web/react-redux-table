import axios from 'axios';
import { API_DATA } from './config';

const initialState = {
  data: {
    dataMain: [],
    dataPagination: [],
    dataPages: [],
  },
  filters: {
    sortByAscending: false
  }
}

// сортировка по возрастанию
const sortByAscending = data => data.sort(function (a, b) {
  return a.id - b.id;
});

// сортировка по убыванию
const sortByDescending = data => data.sort(function (a, b) {
  return b.id - a.id;
});

// массив для номеров страниц пагинации
const numArr = num => {
  const arr = [];

  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }

  return arr;
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/sortByAscending': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: {
          ...state.data,
          dataPagination: sortByAscending(state.data.dataPagination),
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
          dataPagination: sortByDescending(state.data.dataPagination),
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
    default:
      return state;
  }
};

// функция загрузки данных с сервера
export async function fetchData(dispatch) {
  const res = await axios.get(API_DATA);

  dispatch({ type: 'data/dataLoaded', payload: res.data });
}