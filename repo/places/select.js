function makeSelectPlaces (db) {
  return (options, user) => {
    /*
    if (!(user && user.id)) {
      return Promise.resolve([])
    }
      */

    const params = []

    let sql = `
      SELECT
        p.id,
        p.name,
        p.shortname,
        p.abbreviation,
        p.description,
        p.website,
        p.phone,
        p.address,
        p.postcode,
        p.contact,
        p.email,
        p.categoryid,
        pc.name as categoryname,
        u.token as usertoken
      FROM
        places p
      LEFT JOIN
        placecategories pc ON pc.id = p.categoryid
      LEFT JOIN
        users u ON u.placeid = p.id
      WHERE
        1 = 1`
      
    if (options.id) {
      sql += ' AND p.id = $1'
      params.push(options.id)
    }
/*
    const placeId = user.placeId || options.id
    if (placeId) {
      sql += 'AND p.id = $1'
      params.push(placeId)
    }
*/
    sql += `
      ORDER BY
        p.name ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          name: row.name,
          shortName: row.shortname,
          abbreviation: row.abbreviation,
          description: row.description,
          website: row.website,
          phone: row.phone,
          address: row.address,
          postcode: row.postcode,
          contact: row.contact,
          email: row.email,
          categoryId: row.categoryid,
          categoryName: row.categoryname,
          // userToken: (user.isAdmin || user.isOrganization) ? row.usertoken : undefined
        }))
      })
  }
}

module.exports = makeSelectPlaces
