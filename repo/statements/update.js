function makeUpdateStatements (db) {
  return (statement) => {
    const params = [
      statement.statement,
      statement.order,
      statement.id
    ]

    const sql = `
      UPDATE statements
      SET
        statement = $1,
        order = $2
      WHERE
        id = $3
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateStatements
