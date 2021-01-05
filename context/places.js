
function makePlacesContext () {
  const makeSelectPlaces = require('../repo/places/select')
  const makePlaceRouter = require('../routes/places')

  const selectPlaces = makeSelectPlaces()
  return makePlaceRouter(selectPlaces)
}

module.exports = makePlacesContext
