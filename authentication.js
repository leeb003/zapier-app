const test = (z, bundle) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  const promise = z.request({
    method: 'GET',
    url: `${process.env.BASE_URL || bundle.authData.BASE_URL}/wp-json/shwcpz/v1/ping`,
  });

  // This method can return any truthy value to indicate the credentials are valid.
  // Raise an error to show
  return promise.then((response) => {
    if (response.status === 401
      || response.status === 403) {
      throw new Error('The username and/or password you supplied is incorrect');
    }
    return response;
  });
};

module.exports = {
  type: 'custom',
  test: test,
  fields: [
	{key: 'username', type: 'string', required: true, helpText: 'A Username is required'},
    {key: 'password', type: 'password', required: true, helpText: 'The password associated with the username'},
	{key: 'BASE_URL', type: 'string', required: true, helpText: 'Your website url WP Contacts is installed at.', placeholder: 'https://www.yoursite.com'},
  ],
};
