const { toTuple, flatten } = require('pg-parameterize')

function makeInsertAnswers (db) {
  return (answers) => {
    const params = flatten(answers)
    if (params.length === 0) {
      return Promise.resolve(1)
    }

    const sql = `
      INSERT INTO answers(
        placeid,
        questionid,
        answer
      )
      VALUES ${toTuple(answers, true)}`

    return db
      .query(sql, params)
      .then(res => res.rowCount)
  }
}

module.exports = makeInsertAnswers
