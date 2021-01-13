function makeUpdateAnswers (db, makeInsertAnswers, makeDeleteAnswers) {
  return async (answers) => {
    const client = await db.connect()
    const insertAnswers = makeInsertAnswers(client)
    const deleteAnswers = makeDeleteAnswers(client)

    const placeId = answers[0].placeId
    console.log(placeId)

    const values = answers.map(a => ([
      a.placeId,
      a.questionId,
      a.answer || false
    ]))

    try {
      await client.query('BEGIN')
      await deleteAnswers({ placeId })
      const insertCount = await insertAnswers(values)

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

module.exports = makeUpdateAnswers
