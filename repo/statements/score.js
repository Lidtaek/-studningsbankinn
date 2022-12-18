function makeSelectStatementScore (db) {
  return (options) => {
    const params = [
      options.statementIds
    ]

    //  Vantar að tengja bara framhaldsskóla / placecategory
    const sql = `
			SELECT
				p.id,
				p."name",
				SUM(CASE WHEN a.answer THEN sq.weight ELSE 0 END) as score
			FROM answers a
			JOIN
				places p on p.id = a.placeid 
			JOIN
				statementquestions sq on sq.questionid = a.questionid
			WHERE
				sq.statementid = ANY ($1)
			GROUP BY
				p.id,
				p."name" 
			ORDER BY
				score desc
      LIMIT 5`

    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,          
          name: row.name,
          score: row.score
        }))
      })       
  }
}

module.exports = makeSelectStatementScore


