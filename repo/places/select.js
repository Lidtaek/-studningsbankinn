function makeSelectPlaces (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        p.id,
        p.name,
        p.description,
        p.website,
        p.phone,
        p.address,
        p.postcode,
        p.contact,
        p.email,
        p.categoryid,
        pc.name as categoryname
      FROM
        places p
      LEFT JOIN
        placecategories pc ON pc.id = p.categoryid
      WHERE
        1 = 1`

    if (options.id) {
      sql += 'AND p.id = $1'
      params.push(options.id)
    }

    sql += `
      ORDER BY
        p.name ASC`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,
          name: row.name,
          description: row.description,
          website: row.website,
          phone: row.phone,
          address: row.address,
          postcode: row.postcode,
          contact: row.contact,
          email: row.email,
          categoryId: row.categoryid,
          categoryName: row.categoryname
        }))
      })
  }
}

module.exports = makeSelectPlaces
