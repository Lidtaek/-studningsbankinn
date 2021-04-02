function makeSelectQuestionCategories (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        qc.id,
        qc.name,
        qc.ordering
      FROM
        questioncategories qc
      WHERE 1=1`

    if (options.id) {
      sql += 'AND qc.id = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        qc.ordering ASC,
        qc.id ASC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectQuestionCategories
