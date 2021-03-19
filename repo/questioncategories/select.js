function makeSelectQuestionCategories (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        q.id,
        q.name
      FROM
        questioncategories q
      WHERE 1=1`

    if (options.id) {
      sql += 'AND q.id = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        q.order ASC,
        q.id DESC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectQuestionCategories
