
function makeSelectUsers (db) {
  return (options) => {
    const params = []
    let sql = `
      SELECT
        u.id,
        u.username,
        u.password,
        u.name,
        u.placeid,
        u.token,
        p.name as placename
      FROM users u
      LEFT JOIN
        places p ON u.placeid = p.id
      WHERE 1 = 1`

    if (options.username) {
      sql += ' AND username = $1'
      params.push(options.username)
    }

    if (options.id) {
      sql += ' AND u.id = $1'
      params.push(options.id)
    }

    if (options.token) {
      sql += ' AND token = $1'
      params.push(options.token)
    }

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          username: row.username,
          password: row.password,
          token: row.token,
          name: row.name,
          isAdmin: row.placeid === null,
          placeId: row.placeid,
          placeName: row.placename || 'Vefstjóri'
        }))
      })
  }
}

module.exports = makeSelectUsers
