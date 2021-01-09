
function makeSelectUsers (db) {
  return (options) => {
    const params = []
    let sql = `
      SELECT
        u.id,
        u.email,
        u.password,
        u.name,
        u.placeid,
        p.name as placename
      FROM users u
      LEFT JOIN
        places p ON u.placeid = p.id
      WHERE 1 = 1`

    if (options.username) {
      sql += ' AND username = $1'
      params.push(options.username)
    }

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          username: row.username,
          password: row.password,
          name: row.name,
          placeId: row.placeid,
          placeName: row.placename
        }))
      })
  }
}

module.exports = makeSelectUsers
