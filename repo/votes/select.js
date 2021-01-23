function makeSelectVotes (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        v.id,
        v.answerid,
        v.vote,
        v.ipaddress,
        q.question,
        a.answer,
        p.name as placename
      FROM
        votes v
      JOIN
        answers a ON a.id = v.answerid
      JOIN
        questions q ON q.id = a.questionid        
      JOIN 
        places p ON p.id = a.placeid

      WHERE 1 = 1`

    if (options.id) {
      sql += ' AND v.id = $1'
      params.push(options.id)
    }

    if (options.ipAddress && options.answerId) {
      sql += ' AND v.ipaddress = $1 AND v.answerid = $2'
      params.push(options.ipAddress)
      params.push(options.answerId)
    } else if (options.answerId) {
      sql += ' AND v.answerid = $1'
      params.push(options.answerId)
    }

    sql += `
      ORDER BY
        v.id DESC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          answerId: row.answerid,
          answer: row.answer,
          question: row.question,
          placeName: row.placename,
          vote: row.vote,
          ipAddress: row.ipaddress
        }))
      })
  }
}

module.exports = makeSelectVotes
