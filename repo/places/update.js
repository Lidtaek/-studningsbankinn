function makeUpdatePlaces (db) {
  return (place, user) => {
    const params = [
      place.name,
      place.shortName,
      place.abbreviation,
      place.description,
      place.website,
      place.phone,
      place.address,
      place.postcode,
      place.contact,
      place.email,
      place.categoryId,
      user.isAdmin ? place.id : user.placeId,
    ]

    const sql = `
      UPDATE places
      SET
        name = $1,
        shortname = $2,
        abbreviation = $3,
        description = $4,
        website  = $5,
        phone = $6,
        address = $7,
        postcode = $8,
        contact = $9,
        email = $10,
        categoryid = $11
      WHERE
        id = $12
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdatePlaces
