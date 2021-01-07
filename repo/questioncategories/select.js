function makeSelectQuestionCategories (db) {
  return () => {
    const params = []

    const sql = `
      SELECT
        id,
        name
      FROM
        questioncategories
      ORDER BY
        name ASC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectQuestionCategories
