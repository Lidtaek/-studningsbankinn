function makeUpdateStatements (db) {
  return (statement) => {
    const params = [
      statement.statement,
      statement.id
    ]

    const sql = `
      UPDATE statements
      SET
        statement = $1
      WHERE
        id = $2
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateStatements
