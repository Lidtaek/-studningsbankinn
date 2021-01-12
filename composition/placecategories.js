
function makePlaceComposition (db) {
  const makeSelectPlaceCategories = require('../repo/placecategories/select')
  const makeInsertPlaceCategories = require('../repo/placecategories/insert')
  const makeUpdatePlaceCategories = require('../repo/placecategories/update')
  const makeDeletePlaceCategories = require('../repo/placecategories/delete')
  const makePlaceRouter = require('../routes/crud')

  const selectPlaceCategories = makeSelectPlaceCategories(db)
  const insertPlaceCategories = makeInsertPlaceCategories(db)
  const updatePlaceCategories = makeUpdatePlaceCategories(db)
  const deletePlaceCategories = makeDeletePlaceCategories(db)

  return makePlaceRouter(selectPlaceCategories, insertPlaceCategories, updatePlaceCategories, deletePlaceCategories)
}

module.exports = makePlaceComposition
