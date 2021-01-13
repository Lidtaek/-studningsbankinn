const { toTuple, flatten } = require('pg-parameterize')

function makeInsertQuestionnaire (db) {
  return (questionnaires) => {
    const params = flatten(questionnaires)
    if (params.length === 0) {
      return Promise.resolve(1)
    }

    const sql = `
      INSERT INTO questionnaires(
        placecategoryid,
        questionid   
      )
      VALUES ${toTuple(questionnaires, true)}`

    return db
      .query(sql, params)
      .then(res => res.rowCount)
  }
}

module.exports = makeInsertQuestionnaire
