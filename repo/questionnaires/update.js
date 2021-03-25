function makeUpdateQuestionnaires (db) {
  return async (questionnaire) => {
    const params = [
      questionnaire.questionId,
      questionnaire.placeCategoryId,
      questionnaire.ordering || 0,
      questionnaire.use,      
      questionnaire.id
    ]

    const sql = `
      UPDATE questionnaires
      SET
        questionid = $1,
        placecategoryid = $2,
        ordering = $3,
        use = $4
      WHERE
        id = $5
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateQuestionnaires
