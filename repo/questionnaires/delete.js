function makeDeleteQuestionnaire (db) {
  return (questionnaire) => {
    const params = [
      questionnaire.placeCategoryId
    ]

    const sql = `
      DELETE FROM
        questionnaires
      WHERE
        placecategoryid = $1
      RETURNING
        placecategoryid`

    return db
      .query(sql, params)
      .then(res => res.rowCount)
  }
}

module.exports = makeDeleteQuestionnaire
