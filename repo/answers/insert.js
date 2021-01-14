function makeInsertAnswers (db) {
  return (answer) => {
    const params = [
      answer.placeId,
      answer.questionId,
      answer.answer
    ]

    if (params.length === 0) {
      return Promise.resolve(1)
    }

    const sql = `
      INSERT INTO answers(
        placeid,
        questionid,
        answer
      )
      VALUES (
        $1, $2, $3
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertAnswers
