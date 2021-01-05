
function makePlacesContext (db) {
  const makeSelectPlaces = require('../repo/places/select')
  const makePlaceRouter = require('../routes/places')

  const selectPlaces = makeSelectPlaces(db)
  return makePlaceRouter(selectPlaces)
}

module.exports = makePlacesContext
