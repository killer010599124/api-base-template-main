/*
  Add your form validations in this folder.

  Here you can see an example of how your response model could be

 */

export function checkFormDataExample(body) {
  const { myInput } = body || {};

  const ret = {
    data: {}, // object to validated data
    errors: [], // errors
  };

  // add yours validations for your vars
  if (!myInput) {
    ret.errors.push({
      mss: 'My error message', // <<= Your error message (ES-es || EN-en)
      input: 'myInput', // <<= input validated
    });
  } else ret.data.myInput = myInput; // if not exists errors, set the value for the key at the data object

  /*
    from your controller, you handle the response or actions of the data.

    If (errors.length > 0) you should return the response to the user with a 422 status code with the errors.

   */
  return ret;
}

export default {
  checkFormDataExample,
};
