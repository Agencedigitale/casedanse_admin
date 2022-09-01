'use strict'
const Codeqr = use('App/Models/Codeqr')
import { QRCode } from 'qrcode'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with codeqrs
 */
class CodeqrController {
  /**
   * Show a list of all codeqrs.
   * GET codeqrs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new codeqr.
   * GET codeqrs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new codeqr.
   * POST codeqrs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const id_salle = request.input('salle')
    const description = request.input('description')
    const code = "123456"
    const lien = `/verif_codeqr/${id_salle}/${code}`
    const data = {
      "salle_id":id_salle,
      "code":code,
      "lien":lien
    }

    let stJson = JSON.stringify(data)
    
  }

  /**
   * Display a single codeqr.
   * GET codeqrs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing codeqr.
   * GET codeqrs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update codeqr details.
   * PUT or PATCH codeqrs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a codeqr with id.
   * DELETE codeqrs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CodeqrController
