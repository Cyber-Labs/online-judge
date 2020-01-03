const questions = {
  questions: [
    {
      id: 0,
      contestId: 0,
      name: 'Question 1',
      type: 1,
      difficulty: 'EASY',
      maxScore: 20,
      solution: 'Lorem Ipsum',
      negative: 5,
      partial: 10
    },
    {
      id: 1,
      contestId: 0,
      name: 'Question 2',
      type: 2,
      difficulty: 'EASY',
      maxScore: 20,
      solution: 'Lorem Ipsum',
      negative: 5,
      partial: 10
    },
    {
      id: 2,
      contestId: 1,
      name: 'Question 1',
      type: 3,
      difficulty: 'MEDIUM',
      maxScore: 50,
      solution: 'Lorem Ipsum',
      negative: 20,
      partial: 25
    }
  ],
  isLoading: false,
  errMess: ''
};

export default questions;
