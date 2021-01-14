function makeSelectQuestionnaire (db) {
  return (options, user) => {
    const params = []

    let sql = `
      SELECT
        qn.id,
        qn.use,
        qn.placecategoryid,
        q.question as question,
        q.id as questionid,
        pc.name as placecategoryname
      FROM
        questions q
      LEFT JOIN
        questionnaires qn ON qn.questionid = q.id      
      LEFT JOIN
        placecategories pc ON pc.id = qn.placecategoryid    
      `

    if (user.isPlace) {
      sql += `
        LEFT JOIN
          places p ON p.categoryid = pc.id
        WHERE
          p.id = $1`
      params.push(user.placeId)
    }

    if (user.isOrganization) {
      sql += ' AND (qn.placecategoryid = $1 OR qn.placecategoryid is null)'
      params.push(user.placeCategoryId)
    }

    if (user.isAdmin && options.placeCategoryId) {
      sql += ' AND (qn.placecategoryid = $1 OR qn.placecategoryid is null)'
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
          placeCategoryId: row.placecategoryid || options.placeCategoryId,
          question: row.question,
          placeCategoryName: row.placecategoryname,
          use: row.use || false
        }))
      })
  }
}

module.exports = makeSelectQuestionnaire
