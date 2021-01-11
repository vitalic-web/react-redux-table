const initialState = {
  data: [ // данные с апи
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
  ],
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
    default:
      return state;
  }
}