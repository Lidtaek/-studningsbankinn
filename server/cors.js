function corsOrigin (isProduction) {
  const whitelist = []

  const productionList = [
    'https://studningsbankinn-admin.herokuapp.com/'
  ]

  const developmentList = [
    'http://local.herokuapp.com:1234'
  ]

  if (isProduction) {
    whitelist.push(...productionList)
  } else {
    whitelist.push(...developmentList)
  }

  return function (origin, cb) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed'))
    }
  }
}

module.exports = corsOrigin
