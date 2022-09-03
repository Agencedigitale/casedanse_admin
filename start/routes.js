'use strict'

const { RouteGroup } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('login')
Route.get('/register','UserController.createAdminForm').middleware(['auth'])
//users
Route.get('/accueil','UserController.accueil').middleware(['auth'])
Route.get('/create_form','UserController.create').as('createForm')
Route.post('/create_danseur','UserController.store').validator('CreateUser').as('createUser')
Route.get('/list_users','UserController.index').as('listAll')
//seances
Route.get('/seance_form','SeanceController.create')
Route.get('/seances','SeanceController.index')
Route.post('/create_seance','SeanceController.store')
Route.get('/pointage_form/:id','JourSeanceController.create')
Route.post('/create_pointage','JourSeanceController.store')
//disciplines
Route.get('/discipline_form','DisciplineController.index')
Route.post('/create_discipline','DisciplineController.store')
Route.get('/delete_discipline/:id','DisciplineController.destroy')
//abonnements
Route.get('/list_abonnement','AbonnementController.show')
Route.get('/create_abonnement','AbonnementController.create')
Route.get('/edit_abonnement/:id_abonnement','AbonnementController.edit')
Route.post('/update_abonnement','AbonnementController.update')
Route.post('/post_abonnement','AbonnementController.store')
Route.get('/delete_abonnement/:id_abonnement','AbonnementController.destroy')
//salles
Route.get('/add_salle','SalleController.index')
Route.post('/create_salle','SalleController.store')
//parents
Route.get('/add_parent','ParentController.index')
Route.post('/create_parent','ParentController.store')
//administrateur
Route.post('/login','UserController.login')
Route.get('/logout','UserController.logout').middleware(['auth'])
Route.post('/post_admin','UserController.createAdmin').validator('createAdmin').middleware(['auth'])
//codeqr
Route.post('/verif_codeqr','CodeqrController.store')
Route.get('/list_codesqr','CodeqrController.index').middleware(['auth'])
Route.get('/delete_codeqr/:id_code','CodeqrController.destroy').middleware(['auth'])
//routes x
Route.post('admin_xxx','UserController.adminSecret')


/**
 * API MOBILE ROUTES
 */

//login
Route.post('/loginUser','UserController.loginUser')
//liste des salles
Route.get('/list_salles','UserController.listeSalle')
//salle préférée
Route.get('/sallepref/:id','UserController.sallePreferee')
//liste des seances
Route.get('/userSeance/:id','UserController.listeSeances')
//verifier si la seance a été reserve
Route.get('/checkReservation/:user_id/:seance_id','ReservationController.checkReservation')
//faire une reservation
Route.post('/createReservation/:id','ReservationController.makeReservation')
//listes des reservations
Route.get('/totalReservation/:id','ReservationController.totalReservation')
//check si le user est à jour
Route.get('/userUpdate/:id','UserController.userUpdate')
//comptaliser le nombre de seance d'un user
Route.get('/seancePresence/:id','SeanceController.totalSeance')