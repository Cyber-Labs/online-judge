const app = require('./index');
const { pool } = require('../../../Models/db');
const assert = require('assert');
const supertest = require('supertest');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function isCreated(username) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(username) AS count FROM users WHERE username=?`,
      [username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(Boolean(results[0].count));
      }
    );
  });
}

function clearDb() {
  return new Promise((resolve, reject) => {
    pool.query(`TRUNCATE TABLE users`, (error, results) => {
      return resolve();
    });
  });
}

function verifyEmail(username) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET verified=? WHERE username=?`,
      [1, username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
}

function getOtp(username) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT otp FROM users WHERE username=?`,
      [username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results[0].otp);
      }
    );
  });
}

function isUpdated(username) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT name, semester FROM users WHERE username=?`,
      [username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (
          results.length &&
          results[0].name === 'NBN' &&
          results[0].semester == 4
        ) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      }
    );
  });
}

function isPasswordEqual(username, password) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT password FROM users WHERE username=?`,
      [username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length) {
          bcrypt
            .compare(password, results[0].password)
            .then(res => resolve(res))
            .catch(err => reject(err));
        } else {
          return resolve(false);
        }
      }
    );
  });
}

beforeAll(async () => {
  await clearDb();
});

describe('Test POST /signup', () => {
  afterEach(async () => {
    await clearDb();
  });
  test.only('Should signup correctly using correct details', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
          assert(response.body.success === true);
          assert(response.body.error === null);
          assert(Boolean(response.body.results) === true);
          isCreated('nbnaradhya')
            .then(res => {
              assert(res);
              return resolve();
            })
            .catch(error => reject(error));
        });
    });
  });

  test('Should respond with error when tried to signup with wrong email formats', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn@gmail.com',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then(response => {
          assert(response.body.success === false);
          assert(response.body.error === 'Invalid email');
          assert(Boolean(response.body.results) === false);
          isCreated('nbnaradhya')
            .then(res => {
              assert(!res);
              return resolve();
            })
            .catch(error => reject(error));
        });
    });
  });
});

describe('Test POST /login', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Login without any problems with correct credentials', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              assert(response.body.error === null);
              assert(response.body.success === true);
              const results = response.body.results;
              assert(results.username === 'nbnaradhya');
              assert(Boolean(results.access_token));
              const path = require('path');
              const pubKey = fs.readFileSync(
                path.resolve('rsa_secret.pub'),
                'utf-8'
              );
              jwt.verify(results.access_token, pubKey, (error, decoded) => {
                if (error) {
                  return reject(error);
                }
                assert(decoded.username === 'nbnaradhya');
                return resolve();
              });
            });
        });
    });
  });

  test('Respond with error when tried to login with wrong credentials', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn1234561'
            })
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
              assert(Boolean(response.body.error));
              assert(response.body.success === false);
              assert(!response.body.results);
              return resolve();
            });
        });
    });
  });
});

describe('Test POST /verify_email', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Must verify email with correct otp', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          const otp = await getOtp('nbnaradhya');
          supertest(app)
            .post('/verify_email')
            .send({
              username: 'nbnaradhya',
              otp
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              assert(response.body.error === null);
              assert(response.body.success === true);
              pool.query(
                `SELECT verified FROM users WHERE username=?`,
                ['nbnaradhya'],
                (error, results) => {
                  if (error) {
                    return reject(error);
                  }
                  assert(Boolean(results[0].verified));
                  return resolve();
                }
              );
            });
        });
    });
  });

  test('Respond with error when tried to verify with incorrect otp', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          const otp = (await getOtp('nbnaradhya')) + 1;
          supertest(app)
            .post('/verify_email')
            .set('Accept', 'application/json')
            .send({
              username: 'nbnaradhya',
              otp
            })
            .expect(400)
            .then(response => {
              assert(Boolean(response.body.error));
              assert(response.body.success === false);
              assert(!response.body.results);
              pool.query(
                `SELECT verified FROM users WHERE username=?`,
                ['nbnaradhya'],
                (error, results) => {
                  if (error) {
                    return reject(error);
                  }
                  assert(!results[0].verified);
                  return resolve();
                }
              );
            });
        });
    });
  });
});

describe('Test GET /users', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Respond with user info when logged in properly and given an existing url param(username)', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .expect(200)
            .then(response => {
              supertest(app)
                .get(`/users/${response.body.username}`)
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(200)
                .then(response => {
                  assert(response.body.success);
                  assert(response.body.error === null);
                  assert(Boolean(response.body.results));
                  return resolve();
                });
            });
        });
    });
  });

  test('Respond with error when searching for a non-existing username', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              supertest(app)
                .get(`/users/nbnaradhya1`)
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(404)
                .then(response => {
                  assert(response.body.success === false);
                  assert(Boolean(response.body.error));
                  assert(!response.body.results);
                  return resolve();
                });
            });
        });
    });
  });
});

describe('Test POST /update_user', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Update the user if logged in', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              supertest(app)
                .post('/update_user')
                .send({
                  username: 'nbnaradhya',
                  name: 'NBN',
                  semester: 4
                })
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(200)
                .then(response => {
                  assert(response.body.success);
                  assert(response.body.error === null);
                  assert(Boolean(response.body.results));
                  isUpdated('nbnaradhya')
                    .then(res => {
                      assert(res);
                      return resolve();
                    })
                    .catch(err => reject(err));
                });
            });
        });
    });
  });

  test('Do not  update the user if not logged in or with invalid access_token', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
          supertest(app)
            .post('/update_user')
            .send({
              username: 'nbnaradhya',
              name: 'NBN',
              semester: 4
            })
            .set({ Accept: 'application/json' })
            .expect(400)
            .then(response => {
              assert(response.body.success === false);
              assert(Boolean(response.body.error));
              assert(!response.body.results);
              isUpdated('nbnaradhya')
                .then(res => {
                  assert(!res);
                  return resolve();
                })
                .catch(err => reject(err));
            });
        });
    });
  });
});

describe('Test POST /verify_new_email', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Verify and update the new email with correct otp', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              supertest(app)
                .post('/update_user')
                .send({
                  username: 'nbnaradhya',
                  email: 'nbn.18je0539@ee.iitism.ac.in'
                })
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(200)
                .then(async response => {
                  const otp = await getOtp('nbnaradhya');
                  supertest(app)
                    .post('/verify_new_email')
                    .send({
                      username: 'nbnaradhya',
                      email: 'nbn.18je0539@ee.iitism.ac.in',
                      otp
                    })
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                      assert(response.body.success);
                      assert(response.body.error === null);
                      pool.query(
                        `SELECT email FROM users WHERE username=?`,
                        ['nbnaradhya'],
                        (error, results) => {
                          if (error) {
                            return reject(error);
                          }
                          if (
                            results.length &&
                            results[0].email === 'nbn.18je0539@ee.iitism.ac.in'
                          ) {
                            return resolve('Updated');
                          } else {
                            return reject('Not updated');
                          }
                        }
                      );
                    });
                });
            });
        });
    });
  });

  test('Do not update the new email with incorrect otp', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              supertest(app)
                .post('/update_user')
                .send({
                  username: 'nbnaradhya',
                  email: 'nbn.18je0539@ee.iitism.ac.in'
                })
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(200)
                .then(async response => {
                  const otp = (await getOtp('nbnaradhya')) + 1;
                  supertest(app)
                    .post('/verify_new_email')
                    .send({
                      username: 'nbnaradhya',
                      email: 'nbn.18je0539@ee.iitism.ac.in',
                      otp
                    })
                    .set('Accept', 'application/json')
                    .expect(400)
                    .then(response => {
                      assert(!response.body.success);
                      assert(response.body.error);
                      pool.query(
                        `SELECT email FROM users WHERE username=?`,
                        ['nbnaradhya'],
                        (error, results) => {
                          if (error) {
                            return reject(error);
                          }
                          if (
                            results.length &&
                            results[0].email === 'nbn.18je0539@ee.iitism.ac.in'
                          ) {
                            return reject('Updated');
                          } else {
                            return resolve('Not updated');
                          }
                        }
                      );
                    });
                });
            });
        });
    });
  });
});

describe('Test POST /update_password', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Should update password if logged in and existing password is correct', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              supertest(app)
                .post('/update_password')
                .send({
                  password: 'nbn123456',
                  new_password: 'nbn12345'
                })
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(200)
                .then(async response => {
                  assert(response.body.success);
                  assert(response.body.error === null);
                  isPasswordEqual('nbnaradhya', 'nbn12345')
                    .then(res => {
                      assert(res);
                      return resolve();
                    })
                    .catch(err => reject(err));
                });
            });
        });
    });
  });

  test('Should not update password if existing password is incorrect', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/login')
            .send({
              username: 'nbnaradhya',
              password: 'nbn123456'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              supertest(app)
                .post('/update_password')
                .send({
                  password: 'nbn1234',
                  new_password: 'nbn12345'
                })
                .set({
                  Accept: 'application/json',
                  access_token: response.body.access_token
                })
                .expect(401)
                .then(async response => {
                  assert(!response.body.success);
                  assert(Boolean(response.body.error));
                  isPasswordEqual('nbnaradhya', 'nbn12345')
                    .then(res => {
                      assert(!res);
                      return resolve();
                    })
                    .catch(err => reject(err));
                });
            });
        });
    });
  });

  test('Should not update password if not logged in', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          supertest(app)
            .post('/update_password')
            .send({
              password: 'nbn1234',
              new_password: 'nbn12345'
            })
            .set({ Accept: 'application/json' })
            .expect(401)
            .then(async response => {
              assert(!response.body.success);
              assert(Boolean(response.body.error));
              isPasswordEqual('nbnaradhya', 'nbn12345')
                .then(res => {
                  assert(!res);
                  return resolve();
                })
                .catch(err => reject(err));
            });
        });
    });
  });
});

describe('Test POST /forgot_password', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Should send email without any error if email is linked to some account', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
          supertest(app)
            .post('/forgot_password')
            .send({
              email: 'nikhilbn.18je0539@ee.iitism.ac.in'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
              assert(response.body.success);
              assert(response.body.error === null);
              assert(Boolean(response.body.results));
              return resolve();
            });
        });
    });
  });

  test('Should reject with an error if email is not linked to any account', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
          supertest(app)
            .post('/forgot_password')
            .send({
              email: 'nikhilbn.18je0535@ee.iitism.ac.in'
            })
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
              assert(!response.body.success);
              assert(Boolean(response.body.error));
              assert(!response.body.results);
              return resolve();
            });
        });
    });
  });
});

describe('Test POST /reset_password', () => {
  afterEach(async () => {
    await clearDb();
  });

  test('Should reset the password if given correct otp', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/forgot_password')
            .send({
              email: 'nikhilbn.18je0539@ee.iitism.ac.in'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(async response => {
              const otp = await getOtp('nbnaradhya');
              supertest(app)
                .post('/reset_password')
                .send({
                  password: 'nbn12345',
                  password_confirm: 'nbn12345',
                  username: 'nbnaradhya',
                  otp
                })
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                  assert(response.body.success);
                  assert(response.body.error === null);
                  assert(Boolean(response.body.results));
                  isPasswordEqual('nbnaradhya', 'nbn12345')
                    .then(res => {
                      assert(res);
                      return resolve();
                    })
                    .catch(err => reject(err));
                });
            });
        });
    });
  });

  test('Should not reset the password if given incorrect otp', () => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .post('/signup')
        .send({
          username: 'nbnaradhya',
          name: 'Nikhil BN',
          email: 'nikhilbn.18je0539@ee.iitism.ac.in',
          password: 'nbn123456',
          branch: 1,
          department: 1,
          admission_no: '18je0539',
          semester: 3
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(async response => {
          await verifyEmail('nbnaradhya');
          supertest(app)
            .post('/forgot_password')
            .send({
              email: 'nikhilbn.18je0539@ee.iitism.ac.in'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(async response => {
              const otp = (await getOtp('nbnaradhya')) + 1;
              supertest(app)
                .post('/reset_password')
                .send({
                  password: 'nbn12345',
                  password_confirm: 'nbn12345',
                  username: 'nbnaradhya',
                  otp
                })
                .set('Accept', 'application/json')
                .expect(400)
                .then(response => {
                  assert(!response.body.success);
                  assert(response.body.error);
                  assert(!response.body.results);
                  isPasswordEqual('nbnaradhya', 'nbn12345')
                    .then(res => {
                      assert(!res);
                      return resolve();
                    })
                    .catch(err => reject(err));
                });
            });
        });
    });
  });
});
