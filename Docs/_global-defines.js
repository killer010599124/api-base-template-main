/**
 * @apiDefine GlobalParamsErrors
 *
 * @apiError {String} err Mensaje de error
 * @apiError {Object[]} errors Listado de errores en caso de existir.
 */

/**
 * @apiDefine GlobalErrorSystem
 *
 * @apiErrorExample {JSON} Error server
 * HTTP/1.1 500 Error Internal Server
 * {
    "err": "error message",
}
 */

/**
 * @apiDefine GlobalUnauthorized
 *
 * @apiErrorExample {JSON} Error token
 * HTTP/1.1 401 Unauthorized
 * {
  "err": "Disculpe, pero no se logró obtener la información de su cuenta."
}
 */

/**
 * @apiDefine ErrorNotFound
 *
 * @apiErrorExample {JSON} Not found
 * HTTP/1.1 404 Not Found
 * {
  "err": "Not found",
}
 *
 */
