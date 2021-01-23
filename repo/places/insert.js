function makeInsertPlaces (db) {
  return (place) => {
    const params = [
      place.name,
      place.description,
      place.website,
      place.phone,
      place.address,
      place.postcode,
      place.categoryId
    ]

    const sql = `
      INSERT INTO places(
       name,
       description,
       website,
       phone,
       address,
       postcode,
       categoryid
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertPlaces
