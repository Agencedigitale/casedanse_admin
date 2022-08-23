'use strict'
const Abonnement = use('App/Models/Abonnement')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with abonnements
 */
class AbonnementController {
  /**
   * Show a list of all abonnements.
   * GET abonnements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const abonnements = await Database.select('*').from('abonnements')
    return view.render('list_abonnement',{abonnements})
  }

  /**
   * Render a form to be used for creating a new abonnement.
   * GET abonnements/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('/abonnements/create_abonnement')
  }

  /**
   * Create/save a new abonnement.
   * POST abonnements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    //create abonnement
    const abonnement = await Abonnement.create({
        prix: request.input('prix'),
        nombre: request.input('nombre'),
    })

    await abonnement.save()
    return response.redirect('/create_abonnement')
  }

  /**
   * Display a single abonnement.
   * GET abonnements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const abonnements = await Database.select('*').from('abonnements')
    return view.render('abonnements/list_abonnement', {abonnements})
  }

  /**
   * Render a form to update an existing abonnement.
   * GET abonnements/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({request, params, view }) {
    const id = params.id_abonnement
    const abonnement = await Database.select('*').from('abonnements').where({id:id})
    const abonnee = abonnement[0]
    return view.render('/abonnements/edit_abonnement',{abonnee,id})
  }

  /**
   * Update abonnement details.
   * PUT or PATCH abonnements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ view,params, request, response }) {
    const id = request.input('id')
    const prix = request.input('prix')
    const nombre = request.input('nombre')
    const abonnement = await Database
      .table('abonnements')
      .where('id', id)
      .update({ prix: prix, nombre: nombre })
    const abonnements = await Database.select('*').from('abonnements')
    return view.render('abonnements/list_abonnement', {abonnements})
  }

  /**
   * Delete a abonnement with id.
   * DELETE abonnements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id_abonnement
    const abonnement = await Database
      .table('abonnements')
      .where('id', id)
      .delete()
      return response.redirect("/list_abonnement")
  }
    
}

module.exports = AbonnementController
