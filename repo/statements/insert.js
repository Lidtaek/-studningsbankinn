function makeInsertStatements(db) {
  return (statement) => {
    const params = [
      statement.statement,
      statement.order
    ]

    const sql = `
      INSERT INTO statements(
        statement,
        order      
      )
      VALUES (
        $1,
        $2
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertStatements
