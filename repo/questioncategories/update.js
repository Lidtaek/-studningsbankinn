function makeUpdateQuestionCategories (db) {
  return (category) => {
    const params = [
      category.name,
      category.ordering || 0,
      category.id
    ]

    const sql = `
      UPDATE questioncategories
      SET
        name = $1,
        ordering = $2   
      WHERE
        id = $3
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateQuestionCategories
