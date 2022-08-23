'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
    /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const all_user = await Database.select('*').from('users').where({user_type:0, status:0})
    return view.render('/users/list_all',{all_user})
  }

  async accueil({request, response, view}){
    const all_user = await Database.select('*').from('users').where({user_type:0, status:0}).getCount()
    return view.render('/accueil')
  }
    /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({view}) {
    const salles = await Database.select('*').from('salles')
    const parents = await Database.select('*').from('parents')
    return view.render('/users/create_form',{salles, parents})
  }

    /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    //create user
    const user = await User.create({
        nom: request.input('nom'),
        prenoms: request.input('prenoms'),
        telephone: request.input('telephone'),
        lieu_habitation:request.input('lieu_habitation'),
        lieu_travail:request.input('lieu_travail'),
        parent_id:request.input('parent_id'),
        salle_id:request.input('salle_id'),
        user_type: 0, //niveau danseur
    })

    await user.save()
    return response.redirect('/create_form')
  }

  async logout({auth, response}){
    await auth.logout()
    return response.redirect('/')
  }

  async login({view, request, response, auth, session}){
    const {telephone, password} = request.all()
    try {
      const login = await auth.attempt(telephone, password)
      if (login) {
        const nom = session.put('username',login.nom)
        response.redirect('/accueil')
      }
    } catch (error) {
      console.log("une erreur s'est produite", error)
    }
  }

  /**
   * Create/save a new admin.
   * POST admins
   */
  async createAdminForm({view, session}){
    const admins = await Database.select('*').from('users')
    console.log(admins)
    return view.render('register',{admins})
  }

  async createAdmin ({ request, response, auth, session }) {
    const user = await User.create({
      nom: request.input('nom'),
      prenoms: request.input('prenoms'),
      telephone: request.input('telephone'),
      lieu_habitation: request.input('lieu_habitation'),
      password:request.input('password'),
      user_type: request.input('niveau'),
    })
    
    await user.save()
    return response.redirect('/accueil')
  }

  /**
   * API MOBILE CONTROLLERS
   */

  //connexion de l'utilisateur
  async loginUser({request, response}){
    const numero = request.input('numero')
    const userConnected = await Database.select('*').from('users').where({user_type:3, telephone: numero})
    if (userConnected.length < 1) {
      return response.json({
        etat: false,
        status:403,
        message: "Vous n'avez pas encore été enregistré"
      })
    } else {
      return response.json({
        etat: true,
        user:userConnected,
        status:200
      })
    }
  }

  //liste des salles
  async listeSalle({response}){
    const salles = await Database.select('*').from('salles')
    return response.json({
      etat:true,
      salles:salles,
      status:200
    })
  }

  //liste de la salle préférée
  async sallePreferee({response, params}){
    const user_id = params.id
    const user = await Database.select('*').from('users').where({id:user_id})
    const salle_id = user[0].salle_id
    const salle = await Database.select('*').from('salles').where({id: salle_id})
    return response.json({
      etat:true,
      salle: salle,
      status:200
    })
  }

  //liste des séances
  async listeSeances({response, request, params}){
    const user_id = params.id
    const salle = await Database.select('salle_id').from('users').where({id:user_id, status:0})
    const salle_id = salle[0].salle_id
    const seances = await Database.select('*').from('seances').where({status:0, salle_id:salle_id}).with('salles')
    return response.json({
      etat:true,
      salle: seances,
      status:200
    })
  }

}

module.exports = UserController
