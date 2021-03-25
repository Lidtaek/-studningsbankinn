function makeUpdateAnswers (db) {
  return (answer, user) => {
    const params = [
      answer.questionId,
      user.isAdmin ? answer.placeId : user.placeId,
      answer.answer,
      answer.comment,
      answer.id
    ]

    const sql = `
      UPDATE answers
      SET
        questionid = $1,
        placeid = $2,
        answer = $3,
        comment = $4
      WHERE
        id = $5
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateAnswers
