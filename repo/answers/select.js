function makeSelectAnswers (db) {
  return () => {
    const params = []

    const sql = `
      SELECT
        a.id,
        a.placeid,
        a.categoryid,
        a.questionid,        
        a.answer,
        p.name as placename,
        q.question as question,
        c.name as categoryname
      FROM
        answers a
      JOIN
        places p ON p.id = a.placeid
      JOIN
        questioncategories c ON c.id = a.categoryid
      JOIN
        questions q ON q.id = a.questionid      
      ORDER BY
        placeid ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          placeId: row.placeid,
          categoryId: row.categoryid,
          questionId: row.questionid,
          answer: row.answer,
          placeName: row.placename,
          question: row.question,
          categoryName: row.categoryname
        }))
      })
  }
}

module.exports = makeSelectAnswers
