function makeUpdatePlaces (db) {
  return (place) => {
    const params = [
      place.name,
      place.description,
      place.website,
      place.phone,
      place.address,
      place.postcode,
      place.id
    ]

    const sql = `
      UPDATE places
      SET
        name = $1,
        description = $2,
        website  = $3,
        phone = $4,
        address = $5,
        postcode = $6
      WHERE
        id = $7
      RETURNING
        id`

    return db.query(sql, params).then(res => res.rows[0].id)
  }
}

module.exports = makeUpdatePlaces
