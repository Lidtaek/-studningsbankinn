function makeSelectQuestions (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        id,
        question
      FROM
        questions
      WHERE
        1 = 1`

    if (options.id) {
      sql += 'AND id = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        question ASC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectQuestions
