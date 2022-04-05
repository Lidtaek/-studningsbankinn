function makeUpdatePlaces (db) {
  return (place, user) => {
    const params = [
      place.name,
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
        description = $2,
        website  = $3,
        phone = $4,
        address = $5,
        postcode = $6,
        contact = $7,
        email = $8,
        categoryid = $9
      WHERE
        id = $10
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdatePlaces
