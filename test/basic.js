require('should');
const username=process.env.username;
const password=process.env.password;
const BASE_URL=process.env.BASE_URL;

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('basic auth app', () => {

  it('automatically has Authorize Header add', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    const bundle = {
      authData: {
        username: username,
        password: password
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.status.should.eql(200);
		response.json.auth.should.eql(true);
        done();
      })
      .catch(done);
  });
});

describe('searches', () => {
	
  describe('search entries', () => {
    it('Should find an entry', (done) => {
	  const bundle = {
	    authData: {
		  username: username,
		  password: password,
		  BASE_URL: BASE_URL
		},
		inputData: {
		  entryField: 'id',
		  entryVal: '2'
/*
		  entryField: 'first_name',
		  entryVal: 'bob'
*/
		}
	  };

	  appTester(App.searches.entry.operation.perform, bundle) 

	    .then((results) => {
		  results.entry.first_name.value.should.eql('Jim');
		  done();
	  })
	  .catch(done);
	});
  });
});
