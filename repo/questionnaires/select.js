function makeSelectQuestionnaire (db) {
  return (options, user) => {
    const params = []

    let sql = `
      SELECT
        qn.id,
        qn.questionid,
        qn.placecategoryid,
        q.question as question,
        pc.name as placecategoryname
      FROM
        questionnaires qn
      JOIN
        questions q ON q.id = qn.questionid
      JOIN
        placecategories pc ON pc.id = qn.placecategoryid       
      WHERE
        1 = 1`

    if (user.isAdmin && options.placeCategoryId) {
      sql += 'AND qn.placecategoryid = $1'
      params.push(options.placeCategoryId)
    }

    sql += `
      ORDER BY
        qn.placecategoryid ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          questionId: row.questionid,
          placeCategoryId: row.placecategoryid,
          question: row.question,
          placeCategoryName: row.placecategoryname
        }))
      })
  }
}

module.exports = makeSelectQuestionnaire
