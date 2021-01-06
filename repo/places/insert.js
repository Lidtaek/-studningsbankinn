function makeInsertPlaces (db) {
  return (place) => {
    const params = [
      place.name
    ]

    const sql = `
      INSERT INTO places(
       name
      )
      VALUES (
        $1
      )
      RETURNING
        id`

    return db.query(sql, params).then(res => res.rows[0].id)
  }
}

module.exports = makeInsertPlaces
