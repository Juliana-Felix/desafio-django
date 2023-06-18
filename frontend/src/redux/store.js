import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  establishmentId: null,
  username: '',
  establishmentsCount: 0
};

export const setEstablishmentId = (id) => ({
  type: 'SET_ESTABLISHMENT_ID',
  payload: id
});

export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username
});

export const setEstablishmentsCount = (establishmentsCount) => ({
  type: 'SET_ESTABLISHMENT',
  payload: establishmentsCount
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_ESTABLISHMENT_ID':
        return { ...state, establishmentId: action.payload };
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_ESTABLISHMENTS_COUNT':
          return { ...state, establishmentsCount: action.payload };
      default:
        return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
