import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

const preloadedState = {
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
        city: "Goodyear",
        state: "NC",
        zip: "43682"
      },
      description: "vel vitae tincidunt dolor eget odio at et velit lectus orci placerat tortor vitae dui sed adipiscing vestibulum dolor vestibulum id rutrum in eros ipsum vitae sapien dolor mattis porttitor sit sapien"
    },
  ],
  filters: {
    sortByAscending: false
  }
}

const composedEnhancer = composeWithDevTools();

const store = createStore(rootReducer, preloadedState, composedEnhancer);

export default store;