function makeUpdateScores (db) {
  return (score) => {
    const params = [
      score.score,
      score.placeId,
      score.date      
    ]

    const sql = `
      UPDATE scores
      SET
        score = $1       
      WHERE
        placeid = $2
      AND
        date = $3`      

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateScores
