'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/autenticacao', 'UserController.auth')

Route.get('/categoria', 'CategoryController.all').middleware('auth')
Route.get('/categoria/:id', 'CategoryController.one').middleware('auth')
Route.post('/categoria', 'CategoryController.save').middleware('auth')
Route.put('/categoria', 'CategoryController.update').middleware('auth')
Route.delete('/categoria/:id', 'CategoryController.delete').middleware('auth')

Route.get('/produto', 'ProductController.all').middleware('auth')
Route.get('/produto/categoria/:id', 'ProductController.list').middleware('auth')
Route.get('/produto/:id', 'ProductController.one').middleware('auth')
Route.post('/produto', 'ProductController.save').middleware('auth')
Route.put('/produto', 'ProductController.update').middleware('auth')
Route.delete('/produto/:id', 'ProductController.delete').middleware('auth')