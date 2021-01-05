function makeSelectPlaces (db) {
  return () => {
    const sql = `
      SELECT
        id,
        name
      FROM
        places
      ORDER BY
        name ASC`

    const params = []

    return db.query(sql, params).then(res => res.rows)
  }
}

module.exports = makeSelectPlaces
