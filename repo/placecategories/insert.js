function makeInsertPlaceCategories (db) {
  return (category) => {
    const params = [
      category.name
    ]

    const sql = `
      INSERT INTO placecategories(
        name       
      )
      VALUES (
        $1
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertPlaceCategories
