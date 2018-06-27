const URL = 'http://private-eb9653-collab5.apiary-mock.com'

let token = localStorage.getItem('token');

const apiFetch = (path, originalOptions = {}, ...rest) => {
  const url = `${URL}${path}`
  const options = {
    ...originalOptions,
      headers:{
        Authorization: token && `Bearer ${token}`,
        ...originalOptions.headers
      }
  }
  return fetch(url, options, ...rest)
    .then(res => {
      // token = res.headers.get('x-token');
      console.log(res)
      token = res.response
      localStorage.setItem('token', token)
      return res
    })
    .then(res => res.json())
}

const createUser = (data) => {;
  return apiFetch('/register', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}


export default {
  createUser,
}
