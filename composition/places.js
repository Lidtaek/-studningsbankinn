
function makePlacesComposition (db, logger) {
  const makeSelectPlaces = require('../repo/places/select')
  const makeInsertPlaces = require('../repo/places/insert')
  const makeUpdatePlaces = require('../repo/places/update')
  const makeDeletePlaces = require('../repo/places/delete')
  const makePublicRouter = require('../routes/public')

  const selectPlaces = makeSelectPlaces(db)
  const insertPlaces = makeInsertPlaces(db)
  const updatePlaces = makeUpdatePlaces(db)
  const deletePlaces = makeDeletePlaces(db)
  return makePublicRouter(selectPlaces, insertPlaces, updatePlaces, deletePlaces, logger)
}

module.exports = makePlacesComposition
