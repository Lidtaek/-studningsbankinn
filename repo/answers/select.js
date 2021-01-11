function makeSelectAnswers (db) {
  return (options, user) => {
    const params = []
    let sql = `
      SELECT
        a.id,
        a.placeid,
        a.questionid,
        a.questioncategoryid,
        a.answer,
        p.name as placename,
        q.question as question,
        qc.name as questioncategoryname
      FROM
        answers a
      JOIN
        places p ON p.id = a.placeid
      JOIN
        questioncategories qc ON qc.id = a.questioncategoryid
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
        placename ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          questionId: row.questionid,
          question: row.question,
          placeId: row.placeid,
          placeName: row.placename,
          questionCategoryId: row.questioncategoryid,
          questionCategoryName: row.questioncategoryname,
          answer: row.answer
        }))
      })
  }
}

module.exports = makeSelectAnswers
