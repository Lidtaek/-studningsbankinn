function makeDeleteScores (db) {
  return (score) => {
    const params = [
      score.date
    ]

    const sql = `
      DELETE FROM
        scores
      WHERE
        date = $1`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeDeleteScores
