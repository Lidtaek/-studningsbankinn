function makeInsertQuestions (db) {
  return (question) => {
    const params = [
      question.question
    ]

    const sql = `
      INSERT INTO questions(
        question       
      )
      VALUES (
        $1
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertQuestions
