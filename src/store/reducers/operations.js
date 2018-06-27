export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PENDING_OPERATIONS':
      return state;
    case 'FETCH_PENDING_OPERATIONS_SUCCESS':
      return [...state, ...action.data.pending_operations];
    default:
      return state
  }
}
