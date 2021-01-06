function makeInsertPlaces (db) {
  return (place) => {
    const sql = `
      INSERT INTO places(
       name
      )
      VALUES (
        $1
      )
      RETURNING
        id`

    const params = [
      place.name
    ]
    return db.query(sql, params).then(res => res.rows[0].id)
  }
}

module.exports = makeInsertPlaces
