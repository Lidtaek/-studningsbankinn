function makeDeleteQuestionnaire (db) {
  return (questionnaire) => {
    const params = [
      questionnaire.id
    ]

    const sql = `
      DELETE FROM
        questionnaires
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeDeleteQuestionnaire
