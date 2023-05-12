import { getResponse, getResponseError } from '../Functions/GlobalFunctions';

/*
  Example method for controller

 */

const path = 'Controllers/TestController';

export function myTest(req, res) {
  try {
    return getResponse(res, {
      status: 200,
      mss: 'Test API Template',
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/myTest`);
  }
}

export function myTest404(req, res) {
  try {
    return getResponse(res, {
      status: 404,
      mss: 'Not found!',
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/myTest404`);
  }
}

export default {
  myTest,
  myTest404,
};
