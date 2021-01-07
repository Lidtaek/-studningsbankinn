function makeInsertPlaces (db) {
  return (place) => {
    const params = [
      place.name,
      place.description,
      place.website,
      place.phone,
      place.address,
      place.postcode
    ]

    const sql = `
      INSERT INTO places(
       name,
       description,
       website,
       phone,
       address,
       postcode
      )
      VALUES (
        $1, $2, $3, $4, $5, $6
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertPlaces
