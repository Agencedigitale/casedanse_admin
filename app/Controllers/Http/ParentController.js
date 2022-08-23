'use strict'
const Database = use('Database')
const Parent = use('App/Models/Parent')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with parents
 */
class ParentController {
  /**
   * Show a list of all parents.
   * GET parents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const parents = await Database.select('*').from('parents')
    return view.render('/parents/add_parent',{parents})
  }

  /**
   * Render a form to be used for creating a new parent.
   * GET parents/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new parent.
   * POST parents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, view }) {
    const nom = request.input('nom_parent')
    const numero = request.input('telephone_parent')
    const lieu = request.input('lieu_habitation')

    const parent = await Parent.create({
      nom_parent: nom,
      telephone_parent: numero,
      lieu_habitation: lieu,
    })

    await parent.save()
    const parents = await Database.select('*').from('parents')
    return view.render('/parents/add_parent',{parents})
  }

  /**
   * Display a single parent.
   * GET parents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing parent.
   * GET parents/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update parent details.
   * PUT or PATCH parents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a parent with id.
   * DELETE parents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ParentController
