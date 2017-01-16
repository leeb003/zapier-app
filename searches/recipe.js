module.exports = {
  key: 'entry',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Entry',
  display: {
    label: 'Search Entries',
    description: 'Search for existing entries.'
  },

  // `operation` is where we make the call to your API to do the search
  operation: {
    // This search only has one search field. Your searches might have just one, or many
    // search fields.
    inputFields: [
	  {
		key: 'entryfield',
		type: 'string',
		label: 'Entry Field',
		helpText: 'The actual field name to search (e.g. first_name)'
	  },
	  {
		key: 'entryval',
		type: 'string',
		label: 'Search Value',
		helpText: 'The text to search for.'
	  }
/*
      {
        key: 'entryid',
        type: 'string',
        label: 'Entry ID',
        helpText: 'The ID of the entry you are searching for.'
      }
*/
    ],

    perform: (z, bundle) => {
	  const url = `${process.env.BASE_URL || bundle.authData.BASE_URL}/wp-json/shwcpz/v1/get-entry`;

      // Put the search value in a query param. The details of how to build
      // a search URL will depend on how your API works.
      const options = {
        params: {
		  field: bundle.inputData.entryField,
		  val: bundle.inputData.entryVal,
          //id: bundle.inputData.entryid
        }
      };

      return z.request(url, options)
        .then(response => JSON.parse(response.content));
    }
  }
};
