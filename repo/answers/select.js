function makeSelectAnswers (db) {
  return (options, user) => {
    const params = []
    let sql = `
      SELECT
        a.id,
        a.placeid,
        a.questionid,
        a.answer,
        p.name as placename,
        q.question as question
      FROM
        answers a
      JOIN
        places p ON p.id = a.placeid
      JOIN
        questions q ON q.id = a.questionid
      LEFT JOIN
        users u ON u.placeid = a.placeid
      WHERE
         1 = 1`

    if (options.id) {
      sql += 'AND a.id = $1'
      params.push(options.id)
    }

    if (user && !user.isAdmin && user.placeId) {
      sql += 'AND u.placeid = $1'
      params.push(user.placeId)
    }

    sql += `
      ORDER BY
        p.name ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          questionId: row.questionid,
          question: row.question,
          placeId: row.placeid,
          placeName: row.placename,
          answer: row.answer
        }))
      })
  }
}

module.exports = makeSelectAnswers
