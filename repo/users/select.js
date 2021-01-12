
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
        p.name as placename,
        pc.id as placecategoryid,
        pc.name as placecategoryname
      FROM users u
      LEFT JOIN
        places p ON u.placeid = p.id
      LEFT JOIN
        placecategories pc ON pc.id = u.placecategoryid
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
      sql += ' AND u.token = $1'
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
          placeId: row.placeid,
          placeName: row.placename,
          placeCategoryId: row.placecategoryid,
          placeCategoryName: row.placecategoryname,
          isAdmin: row.placeid === null && row.placecategoryid === null,
          isOrganizatin: row.placecategoryid !== null,
          isPlace: row.placeid !== null
        }))
      })
  }
}

module.exports = makeSelectUsers
