function makeUpdatePlaceCategories (db) {
  return (category) => {
    const params = [
      category.name,
      category.id
    ]

    const sql = `
      UPDATE placecategories
      SET
        name = $1       
      WHERE
        id = $2
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdatePlaceCategories
