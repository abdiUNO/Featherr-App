export const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues)
}

export const toQueryString = params => {
  const keys = Object.keys(params)

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    if (!params[key]) {
      delete params[key]
    }
  }

  const esc = encodeURIComponent
  const query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&')

  return query
}

export const url = 'http://167.99.170.233'

const colors = {
  object: '#2ecc71',
  string: '#474747',
  function: '#9b59b6'
}

export const log = (...params) => {
  console.group(`%c${params[0]}`, `color:${typeof params[0]}; font-weight:bold`)
  for (let i = 1; i < params.length; i++) {
    let param = params[i]
    let type = typeof param

    if (typeof param === 'object') {
      console.dir(param)
    } else {
      console.log(`%c${param}`, `color:${colors[type]}; font-weight:bold`)
    }
  }

  console.groupEnd()
}
