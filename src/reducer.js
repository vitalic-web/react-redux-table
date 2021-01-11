const initialState = {
  data: [],
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

// const apiData = () => {
//   let r = new XMLHttpRequest();
//   r.open("GET", "http://www.filltext.com/?rows=100&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D", true);

//   r.onreadystatechange = () => {
//     if (r.readyState != 4 || r.status != 200) return;
//     let data = JSON.parse(r.responseText);
//   };
//   r.send();
// }

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/sortByAscending': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: sortByAscending(state.data),
        filters: {
          ...state.filters,
          sortByAscending: true,
        },
      }))
    }
    case 'data/sortByDescending': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: sortByDescending(state.data),
        filters: {
          ...state.filters,
          sortByAscending: false,
        },
      }))
    }
    case 'data/dataLoaded': {
      return JSON.parse(JSON.stringify({
        ...state,
        data: action.payload,
      }))
    }
    default:
      return state;
  }
};

export async function fetchData(dispatch, getState) {
  let r = new XMLHttpRequest();
  r.open("GET", "http://www.filltext.com/?rows=100&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D", true);

  r.onreadystatechange = () => {
    if (r.readyState != 4 || r.status != 200) return;
    let data = JSON.parse(r.responseText);
    dispatch({ type: 'data/dataLoaded', payload: data })
  };
  r.send();
}