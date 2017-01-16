const zapier = require('zapier-platform-core');
// To include the Authorization header on all outbound requests, simply define a function here.
// It runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeAuth = (request, z, bundle) => {
  if (bundle.authData.username) {
    username = process.env.username || bundle.authData.username;
    password = process.env.password || bundle.authData.password;
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    request.headers['authorization'] = auth;
  }
  return request;
};

const authentication = require('./authentication');
const search = require('./searches/recipe');
const create = require('./creates/recipe');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    includeAuth,
  ],

  afterResponse: [
  ],

  resources: {
	project: {
      key: 'fieldlist',
      noun: 'Fields',
      list: {
        display: {
          label: 'Field List',
          description: 'The Field List'
        },
        operation: {
          perform: (z, bundle) => {
            const promise = z.request({
              url: `${process.env.BASE_URL || bundle.authData.BASE_URL}/wp-json/shwcpz/v1/get-entry-fields`,
              headers: {
                'content-type': 'application/json'
              }
            });
            return promise.then((response) => JSON.parse(response.content));
          } // called for field list to map fields for a new entry
        }
      }
    },
    issue: {
      key: 'creation',
      noun: 'Creation',
      create: {
		display: {
          label: 'Create Entry',
          description: 'Create a new entry in WP Contacts.',
      	},
        operation: {
          inputFields: [
			// Zapier has incorrect documentation on this type use the 'dynamic' key instead of 'resource' as they have it wrong
            {key: 'fields', required: true, label: 'The Fields', dynamic: 'fieldlist', list: true}, // calls fieldlist.list
          ],
          perform: (z, bundle) => {
            const promise = z.request({
              url: `${process.env.BASE_URL || bundle.authData.BASE_URL}/wp-json/shwcpz/v1/create-entry/`,
              method: 'POST',
              body: JSON.stringify({
                fields: bundle.inputData.fields
              }),
              headers: {
                'content-type': 'application/json'
              }
            });
            return promise.then((response) => JSON.parse(response.content));
          }
        }
      }
    }
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    [search.key]: search
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [create.key]: create
  },
};

// Finally, export the app.
module.exports = App;
