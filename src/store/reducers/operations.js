// Array.prototype.objectify = function (operation_id = 'id') {
//   return this.map(el => ({[el.operation_id]: el}))
// }

const filterOperations = (base, filter) => {
  const filteredOperations = [];
  filter.forEach(el => {
    el.operation_id !== base.operation_id
    ? filteredOperations.push(el) : null
  })
  return filteredOperations
}

const filterVoted = (base, operation) => {
  const filteredOperations = [];
  base.forEach(el => {
    el.operation_id !== operation
    ? filteredOperations.push(el) : null
  })
  return filteredOperations
}

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PENDING_OPERATIONS':
      return state;
    case 'FETCH_PENDING_OPERATIONS_SUCCESS':
    console.log('id      ', action.data)
    return filterOperations(state, action.data)

    case 'FETCH_VOTE_OPERATION':
      return state;
    case 'FETCH_VOTE_OPERATION_SUCCESS':
    // console.log('HELLO', state)
      if (action.data) {
        return filterVoted(state, action.data.operation_id)
      }
      return state
      // if (action.data) {
      //   const stat = Object.values(state)
      //   // console.log('state:    ', stat)
      //   const ret = {}
      //   stat.forEach(el => {
      //     if (Object.keys(el)[0] !== action.data.operation_id)
      //     ret[Object.keys(el)[0]] = Object.values(el)[0]
      //   })
        // console.log('return:    ', ret)
        // return ret÷
      // }


    default:
      return state
  }
}
