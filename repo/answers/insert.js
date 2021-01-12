function makeInsertAnswers (db) {
  return (answer) => {
    const params = [
      answer.placeId,
      answer.questionCategoryId,
      answer.questionId,
      answer.answer || null
    ]

    const sql = `
      INSERT INTO answers(
        placeid,
        questioncategoryid,
        questionid,
        answer
      )
      VALUES (
        $1, $2, $3, $4
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertAnswers
