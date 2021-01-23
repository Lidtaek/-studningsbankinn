function makeUpdateQuestionnaires (db) {
  return async (questionnaire) => {
    const params = [
      questionnaire.questionId,
      questionnaire.placeCategoryId,
      questionnaire.use,
      questionnaire.id
    ]

    const sql = `
      UPDATE questionnaires
      SET
        questionid = $1,
        placecategoryid = $2,
        use = $3        
      WHERE
        id = $4
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateQuestionnaires
