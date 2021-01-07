function makeSelectQuestions (db) {
  return () => {
    const params = []

    const sql = `
      SELECT
        id,
        question
      FROM
        questions
      ORDER BY
        question ASC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectQuestions
