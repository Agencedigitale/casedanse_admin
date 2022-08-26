'use strict'
const {validate} = use('Validator')
const Database = use('Database')
const Seance = use('App/Models/Seance')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with seances
 */
class SeanceController {
  /**
   * Show a list of all seances.
   * GET seances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const all_seances = await Database.select('*').from('seances').where({status:0})
    return view.render('/seances/seances',{all_seances})
  }

  /**
   * Render a form to be used for creating a new seance.
   * GET seances/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({view }) {
    const salles = await Database.select('*').from('salles')
    const disciplines = await Database.select('*').from('disciplines')
    return view.render('seances/create_seance',{salles, disciplines})
  }

  /**
   * Create/save a new seance.
   * POST seances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    //validate form inputs
    const validation = await validate(request.all(), {
      jour:'required',
      date:'required',
  })

  if(validation.fails()){
    session.withErrors(validation.messages()).flashAll()
  }

  //create user
  const seance = await Seance.create({
      jour: request.input('jour'),
      salle_id: request.input('salle'),
      discipline_id: request.input('discipline'),
      date: request.input('date'),
      status:0
  })

  await seance.save()
  return response.redirect('/seances')

  }

  /**
   * Display a single seance.
   * GET seances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing seance.
   * GET seances/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update seance details.
   * PUT or PATCH seances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a seance with id.
   * DELETE seances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async totalSeance({request, response, params}){
    const user_id = params.id
    const seances = await Database.from('jour_seances').where({user_id:user_id}).getCount()
    
    return response.json({
      etat: true,
      nombre: seances,
      status:200
    })
  }
}

module.exports = SeanceController
