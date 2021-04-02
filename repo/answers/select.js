function makeSelectAnswers (db) {
  return (options, user, ipAddress) => {
    if (!(user && user.id)) {
      return Promise.resolve([])
    }
    const params = [ipAddress]
    let sql = `
      SELECT      
        qn.questionid,
        q.question,
        qc.name as questioncategoryname,
        qn.placecategoryid,
        pc.name as placecategoryname,
        p.id as placeid,
        p.name as placename,
        a.id,
        a.answer,
        a.comment,
        uv.vote as uservote,
        count(case when v.vote > 0 then v.vote end) as upvotes,
        count(case when v.vote < 0 then v.vote end) as downvotes
      FROM
        questionnaires qn
      LEFT JOIN
        questions q ON qn.questionid = q.id
      LEFT JOIN
        placecategories pc ON qn.placecategoryid = pc.id
      LEFT JOIN
        questioncategories qc ON q.categoryid = qc.id
      LEFT JOIN
        places p ON p.categoryid = pc.id
      LEFT JOIN
        answers a ON a.questionid = qn.questionid AND a.placeid = p.id
      LEFT JOIN
        votes v ON a.id = v.answerid
      LEFT JOIN
        votes uv ON a.id = uv.answerid AND uv.ipaddress = $1
      WHERE
        qn.use = true`
        
    if (user.isPlace) {
      sql += ' AND p.id = $2'
      params.push(user.placeId)
    }

    if (user.isOrganization) {
      sql += ' AND pc.id = $2'
      params.push(user.placeCategoryId)
    }

    if (user.isAdmin && options.placeId) {
      sql += ' AND p.id = $2'
      params.push(options.placeId)
    }

    sql += `
      GROUP BY
        qn.questionid,
        qn.ordering,
        q.question,
        qc.id,
        qc.name,        
        qn.placecategoryid,
        pc.name,
        p.id,
        p.name,
        a.id,
        a.answer,
        a.comment,
        uv.vote
      ORDER BY
        qc.ordering ASC,        
        qc.id ASC,
        qn.ordering ASC,
        qn.questionid ASC`

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
          answer: row.answer || false,
          comment: row.comment,
          id: row.id,
          userVote: row.uservote,
          upvotes: row.upvotes,
          downvotes: row.downvotes
        }))
      })
  }
}

module.exports = makeSelectAnswers
