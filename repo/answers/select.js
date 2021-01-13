function makeSelectAnswers (db) {
  return (options, user) => {
    if (!(user && user.id)) {
      return Promise.resolve([])
    }
    const params = []
    let sql = `
      SELECT
        qn.questionid,
        q.question,
        qc.name as questioncategoryname,
        qn.placecategoryid,
        pc.name as placecategoryname,
        p.id as placeid,
        p.name as placename,
        a.answer
      FROM
        questionnaires qn
      LEFT JOIN
        questions q ON qn.questionid = q.id
      LEFT JOIN
        placecategories pc ON qn.placecategoryid = pc.id
      LEFT JOIN
        questioncategories qc ON q.categoryid = qc.id
      LEFT JOIN
        places p ON p.categoryid = qc.id
      LEFT JOIN
        answers a ON a.questionid = qn.questionid AND a.placeid = p.id`

    if (user.isPlace) {
      sql += ' WHERE p.id = $1'
      params.push(user.placeId)
    }

    if (user.isOrganization) {
      sql += ' WHERE pc.id = $1'
      params.push(user.placeCategoryId)
    }

    if (user.isAdmin && options.placeId) {
      sql += ' WHERE p.id = $1'
      params.push(options.placeId)
    }

    sql += `
      ORDER BY
        p.name ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          questionId: row.questionid,
          question: row.question,
          questionCategoryName: row.questioncategoryname,
          placeCategoryId: row.placecategoryid,
          placeCategoryName: row.placecategoryname,
          placeId: row.placeid,
          placeName: row.placename,
          answer: row.answer || false
        }))
      })
  }
}

module.exports = makeSelectAnswers
