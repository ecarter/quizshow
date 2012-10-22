module.exports = {
  user: {
    name: 'Test User'
  , secret: 'abcd1234'
  , about: 'I am a test user!'
  , image: '/images/avatar-default.png'
  }
, quiz: {
    name: 'Test Quiz'
  , body: 'This is a test quiz...'
  , format: 'manual'
  }
, questions: [
    { question: 'Question 1' }
  , { question: 'Question 2' }
  , { question: 'Question 3' }
  ]
, answers: [
    { answer: 'Answer 1', value: '10' }
  , { answer: 'Answer 2', value: '20' }
  , { answer: 'Answer 3', value: '30' }
  ]
};
