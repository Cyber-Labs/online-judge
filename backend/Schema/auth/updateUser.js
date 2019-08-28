const schema = {
  required: ['username'],
  properties: {
    username: { type: 'string', minLength: 4 },
    email: {
      type: 'string',
      pattern:
        '^[a-z]+\\.[0-9]{2}[a-z]{2}[0-9]{4}@([a-z]+\\.)?iitism\\.ac\\.in$'
    },
    name: { type: 'string' },
    branch: { type: 'number' },
    department: { type: 'number' },
    admission_no: {
      type: 'string',
      minLength: 8,
      maxLength: 8,
      pattern: '/^[0-9]{2}[a-z]{2}[0-9]{4}$/'
    },
    semester: { type: 'number', minLength: 1, maxLength: 8 }
  },
  errorMessage: {
    required: {
      username: 'Username requried'
    },
    properties: {
      username: 'Invalid username',
      email: 'Invalid email',
      name: 'Invalid name',
      branch: 'Invalid branch',
      department: 'Invalid department',
      admission_no: 'Invalid Admission number',
      semester: 'Invalid semester'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
