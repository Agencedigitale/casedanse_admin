'use strict'
const Reservation = use('App/Models/Reservation')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with reservations
 */
class ReservationController {
  /**
   * Show a list of all reservations.
   * GET reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new reservation.
   * GET reservations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new reservation.
   * POST reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single reservation.
   * GET reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing reservation.
   * GET reservations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update reservation details.
   * PUT or PATCH reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a reservation with id.
   * DELETE reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
  * API MOBILE CONTROLLERS
  */

  async makeReservation({request, response, params}){
    const user_id = params.id
    const salle_id = request.input('salle_id')
    const seance_id = request.input('seance_id')
    //create a reservation
    const reservation = await Reservation.create({
      seance_id: seance_id,
      salle_id:salle_id,
      user_id: user_id
    })
    await reservation.save()
    response.json({
      etat: true,
      reservation: reservation,
      status:200
    })
  }

  async checkReservation({request, response, params}){
    const user_id = params.user_id
    const seance_id = params.seance_id

    const reservation = await Database.select('id').from('reservations').where({seance_id: seance_id, user_id: user_id})
    console.log(reservation)
    if (reservation.length > 0) {
      return response.json({
        etat: true,
        content: true,
        status:200
      })
    }else{
      return response.json({
        etat: false,
        content: false,
        status:204
      })
    }
  }

  async totalReservation({request, response, params}){
    const user_id = params.id
    const total = await Database.from('reservations').where({user_id: user_id}).getCount()
    console.log(total)
    return response.json({
      etat: true,
      nombre: total,
      status:200
    })
  }

}

module.exports = ReservationController
