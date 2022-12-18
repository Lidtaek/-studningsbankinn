function makeSelectStatementQuestions (db) {
  return (options) => {
    const params = [
      options.statementId
    ]
    //  Vantar að tengja bara framhaldsskóla / placecategory
    const sql = `
      SELECT
        q.id as questionid,
        q.question,        
        qc."name" as questioncategoryname,
        qc.id as questioncategoryid,
        sq.id,
        sq.statementid,	
        sq.weight,	
        s."statement"	
      FROM
        questions q
      LEFT JOIN
        questioncategories qc on qc.id = q.categoryid
      LEFT JOIN
        statementquestions sq on sq.questionid  = q.id
      LEFT JOIN
        statements s on s.id = sq.statementid
      LEFT JOIN
        questionnaires qn ON qn.questionid = q.id
      WHERE        
        (sq.statementid  = $1 OR sq.statementid IS null)
      AND
        qn.use = true
      ORDER BY            
        qc.ordering ASC,
        qc.id ASC,
        qn.ordering ASC,
        q.id ASC`


    return db
      .query(sql, params)
      .then(res => {
        return res.rows.map(row => ({
          id: row.id,          
          statementId: row.statementid,
          statement: row.statement,
          questionId: row.questionid,  
          question: row.question,        
          questionCategoryId: row.questioncategoryid,
          questionCategoryName: row.questioncategoryname,
          weight: row.weight
        }))
      })       
  }
}

module.exports = makeSelectStatementQuestions
