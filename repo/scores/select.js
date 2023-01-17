const { toOrdinal } = require('pg-parameterize')
function makeSelectScores (db) {
  return (options) => {
    const params = []

    let sql = `
      SELECT
        s.placeid,
        s.questioncategoryid,
        s.yescount,
        s.nocount,
        s.nacount,
        s.date,
        p.name as placename,
        qc.name as questioncategoryname
      FROM
        scores s      
      LEFT JOIN
        places p ON p.id = s.placeid
      LEFT JOIN
        questioncategories qc ON qc.id = s.questioncategoryid              
      WHERE date = (SELECT Max(date) as maxdate from scores)`

      if (options.date) {
        sql += ' AND date = ?'
        params.push(options.date)
      }

      if (options.placeId) {
        sql += ' AND placeid = ?'
        params.push(options.placeId)
      }

      sql += ` 
        ORDER BY
          s.date DESC,
          p.name ASC`
    
    return db
      .query(toOrdinal(sql), params)
      .then(res => {
        return res.rows.map(row => ({
          placeId: row.placeid,          
          placeName: row.placename,
          questionCategoryId: row.questioncategoryid,
          questionCategoryName: row.questioncategoryname,
          yesCount: row.yescount,
          noCount: row.nocount,
          naCount: row.nacount,
          date: row.date
        }))
      })
  }
}

module.exports = makeSelectScores
