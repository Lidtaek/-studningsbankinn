function makeInsertQuestionCategories (db) {
  return (category) => {
    const params = [
      category.name,
      category.ordering || 0
    ]

    const sql = `
      INSERT INTO questioncategories(
        name,
        ordering
      )
      VALUES (
        $1, $2
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertQuestionCategories
