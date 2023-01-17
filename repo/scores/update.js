function makeUpdateScores (db) {
  return (score) => {
    const params = [
      score.yescount,
      score.nocount,
      score.nacount,
      score.placeId,
      score.questionCategoryId,
      score.date
    ]

    const sql = `
      UPDATE scores
      SET
        yescount = $1,
        nocount = $2,
        nacount = $3
      WHERE
        placeid = $4
      AND
        questioncategoryid = $5
      AND
        date = $6`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateScores
