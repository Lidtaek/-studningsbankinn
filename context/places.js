
function makePlacesContext (db) {
  const makeSelectPlaces = require('../repo/places/select')
  const makeInsertPlaces = require('../repo/places/insert')
  const makePlaceRouter = require('../routes/places')

  const selectPlaces = makeSelectPlaces(db)
  const insertPlaces = makeInsertPlaces(db)
  return makePlaceRouter(selectPlaces, insertPlaces)
}

module.exports = makePlacesContext
