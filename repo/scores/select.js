function makeSelectScores (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        s.placeid,
        s.score,
        s.date,
        p.name as placename
      FROM
        scores s
      LEFT JOIN
        places p ON p.id = s.placeid
      WHERE 1=1`

      if (options.date) {
        sql += ' AND date = ?'
        params.push(options.date)
      }
      sql += `
        ORDER BY
          s.date DESC,
          p.name ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          placeId: row.placeid,
          placeName: row.placename,
          score: row.score,
          date: row.date
        }))
      })
  }
}

module.exports = makeSelectScores
