'use strict'
const Database = use('Database')
const Salle = use('App/Models/Salle')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with salles
 */
class SalleController {
  /**
   * Show a list of all salles.
   * GET salles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const salles = await Database.select('*').from('salles')
    return view.render('/salles/add_salle',{salles})
  }

  /**
   * Render a form to be used for creating a new salle.
   * GET salles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new salle.
   * POST salles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, view }) {
    const nom_salle = request.input('salle')
    const salle = await Salle.create({
      nom_salle: nom_salle,
    })

    await salle.save()
    const salles = await Database.select('*').from('salles')
    return view.render('/salles/add_salle',{salles})
  }

  /**
   * Display a single salle.
   * GET salles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing salle.
   * GET salles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update salle details.
   * PUT or PATCH salles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a salle with id.
   * DELETE salles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SalleController
