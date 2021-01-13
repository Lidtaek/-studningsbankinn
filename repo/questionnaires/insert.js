function makeInsertQuestionnaire (db) {
  return (questionnaire) => {
    const params = [
      questionnaire.questionId,
      questionnaire.placeCategoryId
    ]

    const sql = `
      INSERT INTO questionnaires(
        questionid
        categoryid
      )
      VALUES (
        $1, $2
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertQuestionnaire
