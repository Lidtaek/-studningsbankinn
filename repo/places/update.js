function makeUpdatePlaces (db) {
  return (place) => {
    const params = [
      place.name,
      place.id
    ]

    const sql = `
      UPDATE places
      SET
        name = $1
      WHERE
        id = $2      
      RETURNING
        id`

    return db.query(sql, params).then(res => res.rows[0].id)
  }
}

module.exports = makeUpdatePlaces
