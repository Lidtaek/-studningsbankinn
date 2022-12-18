function makeInsertStatements(db) {
  return (statement) => {
    const params = [
      statement.statement
    ]

    const sql = `
      INSERT INTO statements(
        statement       
      )
      VALUES (
        $1
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertStatements
