function makeSelectStatements (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        id,
        statement
      FROM
        statements
      WHERE 1=1`

    if (options.id) {
      sql += 'AND id = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        statement ASC`

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectStatements
