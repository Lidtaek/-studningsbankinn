function makeDeletePlaceCategories (db) {
  return (category) => {
    const params = [
      category.id
    ]

    const sql = `
      DELETE FROM
        placecategories
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeDeletePlaceCategories
