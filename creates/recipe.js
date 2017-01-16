const entryFields = (z, bundle) => {
  const response = z.request(`${process.env.BASE_URL || bundle.authData.BASE_URL}/wp-json/shwcpz/v1/get-entry-fields`);
  // json is is [{"key":"field_1"},{"key":"field_2"}] 
  return response.then(res => res.json);
};
 
// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'entry',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Entry',
  display: {
    label: 'Create Entry',
    description: 'Creates a new entry.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
	  //{key: 'fielders', required: true, list: true, choices: entryFields} // provide a function inline - we'll merge the results!
	  entryFields
	  //{key: 'fields', required: true, list: true, choices: {entryFields} }
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
};
