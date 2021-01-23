const superagent = require('superagent')

/*
superagent
  .get('http://local.studningsbankinn.is:3001/answers')
  .set('Authorization', 'Bearer 4jhk4DnPWubbIUF_Kg-mwVd04bmKISeB')
  .then(res => {
    console.log(res.body)
  })
*/
superagent
  .post('http://local.studningsbankinn.is:3001/votes')
  .send({
    answerId: 54,
    vote: -1
  })
  .then(res => {
    console.log(res.body)
  })
