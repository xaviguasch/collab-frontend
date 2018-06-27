export const API = Symbol('API') //ask what this

export default baseURL => store => next => action => {
  let token = localStorage.getItem('token');
  console.log('we here')
  if (action[API] ){
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token && `Bearer ${token}`,
      },
      'method': action[API].method
    }
    fetch(`${baseURL}${action[API].path}`, options)
      .then(res => {
        token = res.headers.get('x-token');
        localStorage.setItem('token', token)
        return res
      })
      .then(res => res.json())
      .then(data => {
        const newAction = {
          ...action,
          type: action.type + '_SUCCESS',
          data
        }
        delete newAction[API]
        store.dispatch(newAction)
      })
  }
  next(action)
}
