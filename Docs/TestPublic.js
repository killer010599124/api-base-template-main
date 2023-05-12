/**
 * @api {get | post | put | delete} / (00) Verificar ruta de prueba.
 * @apiVersion 0.0.1
 * @apiName testApiTest
 * @apiGroup Test
 *
 * @apiSuccess {String} mss Mensaje de retorno.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "mss": "Test API Template."
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {get | post | put | delete} /non-existent-path (01) Verificar respuesta 404 de rutas no existentes.
 * @apiVersion 0.0.1
 * @apiName nonExistentPathsTest
 * @apiGroup Test
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiUse ErrorNotFound
 *
 * @apiUse GlobalErrorSystem
 *
 */
