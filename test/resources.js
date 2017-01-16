/*
require('should');

const zapier = require('zapier-platform-core');
const username=process.env.username;
const password=process.env.password;
const BASE_URL=process.env.BASE_URL;;

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('resources', () => {
  describe('create an entry', () => {
    it('should create a new entry', (done) => {
      const bundle = {
        authData: {
          username: username,
          password: password,
          BASE_URL: BASE_URL
        },
        inputData: {
          fields: {
            first_name: 'Smith Family',
            last_name: 'Tester',
          },
        }
      };

      //appTester(App.resources.issue.create.operation.perform, bundle)
	  appTester(App.resources.project.list.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('id');
          done();
        })
        .catch(done);
    });
  });
});
*/
