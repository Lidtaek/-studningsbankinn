const makeRemoveQuestion = function(makeDeleteQuestion, makeDeleteQuestionFromAnswers, makeDeleteQuestionFromQuestionnaire, db) {
  return async function removeQuestion(question) {
    const client = await db.connect()

    const deleteQuestion = makeDeleteQuestion(client)
    const deleteQuestionFromAnswers = makeDeleteQuestionFromAnswers(client)
    const deleteQuestionFromQuestionnaire = makeDeleteQuestionFromQuestionnaire(client)

    try {
      await client.query('BEGIN')
      await deleteQuestion(question)
      await deleteQuestionFromAnswers(question)
      await deleteQuestionFromQuestionnaire(question)
      
      await client.query('COMMIT')
      return { questionId: question.questionId }
    } catch (e) {
      await client.query('ROLLBACK')
    } finally  {
      await client.query('RELEASE')
    }

  }
}

module.exports = makeRemoveQuestion