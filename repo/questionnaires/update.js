function makeUpdateQuestionnaires (db, makeInsertQuestionnaires, makeDeleteQuestionnaires) {
  return async (questionnaire) => {
    console.log(questionnaire)
    const client = await db.connect()
    const insertQuestionnaires = makeInsertQuestionnaires(client)
    const deleteQuestionnaires = makeDeleteQuestionnaires(client)

    const placeCategoryId = questionnaire.placeCategoryId

    const questionnaires = questionnaire.questions.map(questionId => ([
      placeCategoryId,
      questionId
    ]))

    try {
      await client.query('BEGIN')
      await deleteQuestionnaires({ placeCategoryId })
      const insertCount = await insertQuestionnaires(questionnaires)

      await client.query('COMMIT')
      return insertCount
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeUpdateQuestionnaires
