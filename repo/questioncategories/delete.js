function makeDeleteQuestionCategories (db) {
  return (category) => {
    const params = [
      category.id
    ]

    const sql = `
      DELETE FROM
        questioncategories
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeDeleteQuestionCategories
