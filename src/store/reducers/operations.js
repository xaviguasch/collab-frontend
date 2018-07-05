// const filterOperations = (base, filter) => {
//   const filteredOperations = [];
//   filter.forEach(el => {
//     el.operation_id !== base.operation_id
//       ? filteredOperations.push(el) : null;
//   });
//   return filteredOperations;
// };

const filterVoted = (base, operation) => {
  if (!operation) return base;
  const filteredOperations = [];
  Array.isArray(base) ? null : base = Array.from(base);
  base.forEach(el => {
    el.operation_id !== operation.operation_id
      ? filteredOperations.push(el) : null;
  });
  return filteredOperations;
};

export default (state = [], action) => {
  switch (action.type) {
  case 'FETCH_ALL_PENDING_OPERATIONS':
    return state;
  case 'FETCH_ALL_PENDING_OPERATIONS_SUCCESS':
    try {
      const data = Object.values(action.data)[0];
      return data;
    } catch (e) {
      return state;
    }
  case 'FETCH_VOTE_OPERATION':
    return state;
  case 'FETCH_VOTE_OPERATION_SUCCESS':
    return filterVoted(state, action.data);
  case 'FETCH_PROPOSE_OPERATION':
    return state;
  case 'FETCH_PROPOSE_OPERATION_SUCCESS':
    return [...state, action.data] || state;
  case 'FETCH_ADD_USER':
    return state;
  case 'FETCH_ADD_USER_SUCCESS':
    return [...state, action.data] || state;
  default:
    return state;
  }
};
