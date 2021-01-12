
function makePlacesComposition (db) {
  const makeSelectPlaces = require('../repo/places/select')
  const makeInsertPlaces = require('../repo/places/insert')
  const makeUpdatePlaces = require('../repo/places/update')
  const makeDeletePlaces = require('../repo/places/delete')
  const makePlaceRouter = require('../routes/crud')

  const selectPlaces = makeSelectPlaces(db)
  const insertPlaces = makeInsertPlaces(db)
  const updatePlaces = makeUpdatePlaces(db)
  const deletePlaces = makeDeletePlaces(db)
  return makePlaceRouter(selectPlaces, insertPlaces, updatePlaces, deletePlaces)
}

module.exports = makePlacesComposition
