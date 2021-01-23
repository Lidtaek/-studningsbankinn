function makeInsertQuestionnaire (db) {
  return (questionnaire) => {
    const params = [
      questionnaire.placeCategoryId,
      questionnaire.questionId,
      questionnaire.use
    ]

    if (params.length === 0) {
      return Promise.resolve(1)
    }

    const sql = `
      INSERT INTO questionnaires(
        placecategoryid,
        questionid,
        use
      )
      VALUES (
        $1, $2, $3
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertQuestionnaire
