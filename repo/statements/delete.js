function makeDeleteStatement (db) {
  return (statement ) => {
    const params = [
      statement .id
    ]

    const sql = `
      DELETE FROM
        statements
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeDeleteStatement
