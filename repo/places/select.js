function makeSelectPlaces (db) {
  return (options) => {
    const params = []
    let sql = `
      SELECT
        id,
        name
      FROM
        places
      WHERE
        1 = 1`

    if (options.id) {
      sql += 'AND id = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        name ASC`

    return db.query(sql, params).then(res => res.rows)
  }
}

module.exports = makeSelectPlaces
