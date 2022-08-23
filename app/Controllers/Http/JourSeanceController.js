'use strict'
const Database = use('Database')
const JourSeance = use('App/Models/JourSeance')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jourseances
 */
class JourSeanceController {
  /**
   * Show a list of all jourseances.
   * GET jourseances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new jourseance.
   * GET jourseances/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, params }) {
    const id = params.id
    const users = await Database.select('*').from('users').where({user_type:0, status:0})
    const person_in_seance = await Database.select('*').from('jour_seances').where({seance_id: id})
    return view.render('seances/pointage',{person_in_seance, users, id})
  }

  /**
   * Create/save a new jourseance.
   * POST jourseances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    //create user
    const jour_seance = await JourSeance.create({
      seance_id: request.input("id"),
      user_id: request.input("nom"),
      heure_arrivee: request.input('heure_debut'),
      heure_depart: request.input('heure_fin')
  })

  await jour_seance.save()
  return response.redirect(`/pointage_form/${request.input("id")}`)
  }

  /**
   * Display a single jourseance.
   * GET jourseances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing jourseance.
   * GET jourseances/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update jourseance details.
   * PUT or PATCH jourseances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a jourseance with id.
   * DELETE jourseances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = JourSeanceController
