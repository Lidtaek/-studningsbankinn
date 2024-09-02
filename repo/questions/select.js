function makeSelectQuestions (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        q.id,
        q.question,
        q.categoryid,
        qc.name as categoryname
      FROM
        questions q
      LEFT JOIN
        questioncategories qc ON qc.id = q.categoryid
      WHERE
        1 = 1`

    if (options.id) {
      sql += ' AND q.id = $1'
      params.push(options.id)
    }

    if (options.categoryId) {
      sql += ' AND q.categoryid = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        q.order ASC,
        q.id DESC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          question: row.question,
          categoryId: row.categoryid,
          categoryName: row.categoryname
        }))
      })
  }
}

module.exports = makeSelectQuestions
