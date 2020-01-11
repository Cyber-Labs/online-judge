let addGroup = {
  anyOf: [
    {
      required: ['username', 'name', 'description', 'confidential']
    },
    {
      required: ['username', 'name', 'description', 'confidential']
    }
  ],
  properties: {
    username: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    confidential: { type: 'number', maximum: 1, minimum: 0 }
  },
  errorMessage: {
    required: {
      username: 'Not logged in',
      description: 'Please fill the description field',
      name: 'Please fill name field',
      confidential: 'Please fill confidential field'
    },
    properties: {
      username: 'Not logged in',
      description: 'description is invalid',
      confidential: 'confidential is invalid',
      name: 'Name is invalid'
    },
    _: 'Invalid Data'
  }
};

let addUserToGroup = {
  anyOf: [
    {
      required: ['username', 'group_id', 'admin', 'usernameToAdd']
    },
    {
      required: ['username', 'group_id', 'admin', 'usernameToAdd']
    }
  ],
  properties: {
    username: { type: 'string' },
    group_id: { type: 'number' },
    usernameToAdd: { type: 'string' },
    admin: { type: 'number', maximum: 1, minimum: 0 }
  },
  errorMessage: {
    required: {
      username: 'Not logged in',
      group_id: 'Please fill the group_id field',
      usernameToAdd: 'Please fill usernameToAdd field',
      admin: 'Please fill admin field'
    },
    properties: {
      username: 'Not logged in',
      group_id: 'group_id is invalid',
      admin: 'admin is invalid',
      usernameToAdd: 'usernameToAdd is invalid'
    },
    _: 'Invalid Data'
  }
};

let makeUserAdmin = {
  anyOf: [
    {
      required: ['username', 'group_id', 'usernameToChange']
    },
    {
      required: ['username', 'group_id', 'usernameToChange']
    }
  ],
  properties: {
    username: { type: 'string' },
    group_id: { type: 'number' },
    usernameToChange: { type: 'string' }
  },
  errorMessage: {
    required: {
      username: 'Not logged in',
      group_id: 'Please fill the group_id field',
      usernameToChange: 'Please fill usernameToChange field'
    },
    properties: {
      username: 'Not logged in',
      group_id: 'group_id is invalid',
      usernameToChange: 'usernameToChange is invalid'
    },
    _: 'Invalid Data'
  }
};

let updateGroup = {
  anyOf: [
    {
      required: ['username', 'group_id', 'description']
    },
    {
      required: ['username', 'group_id', 'description']
    }
  ],
  properties: {
    username: { type: 'string' },
    group_id: { type: 'number' },
    description: { type: 'string' }
  },
  errorMessage: {
    required: {
      username: 'Not logged in',
      group_id: 'Please fill the group_id field',
      description: 'Please fill description field'
    },
    properties: {
      username: 'Not logged in',
      group_id: 'group_id is invalid',
      description: 'description is invalid'
    },
    _: 'Invalid Data'
  }
};

let copyGroup = {
  anyOf: [
    {
      required: ['username', 'name', 'description', 'confidential', 'newname']
    },
    {
      required: ['username', 'name', 'description', 'confidential', 'newname']
    }
  ],
  properties: {
    username: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    confidential: { type: 'number', maximum: 1, minimum: 0 },
    newname: { type: 'string' }
  },
  errorMessage: {
    required: {
      username: 'Not logged in',
      description: 'Please fill the description field',
      name: 'Please fill name field',
      confidential: 'Please fill confidential field',
      newname: 'Please specify new name'
    },
    properties: {
      username: 'Not logged in',
      description: 'description is invalid',
      confidential: 'confidential is invalid',
      name: 'Name is invalid',
      newname: 'new name is invalid'
    },
    _: 'Invalid Data'
  }
};
