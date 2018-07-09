export default (state = [], action) => {
  switch (action.type) {
  case 'FETCH_GET_TRANSACTIONS':
    return state;
  case 'FETCH_GET_TRANSACTIONS_SUCCESS':
    return [...state, ...action.data];
  default:
    return state;
  }
};
