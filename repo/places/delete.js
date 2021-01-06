function makeDeletePlaces (db) {
  return (place) => {
    const params = [
      place.id
    ]

    const sql = `
      DELETE FROM
        places
      WHERE
        id = $1
      RETURNING
        id`

    return db.query(sql, params).then(res => res.rows[0].id)
  }
}

module.exports = makeDeletePlaces
