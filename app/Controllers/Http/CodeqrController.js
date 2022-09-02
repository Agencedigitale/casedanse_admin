'use strict'
const Codeqr = use('App/Models/Codeqr')
const Database = use('Database')
const QRCode = require('qrcode')
const Helpers = use('Helpers')
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
    const codesqr = await Database.select('*').from('codeqrs').where({status:0})
    const salles = await Database.select('*').from('salles')
    const data = []
    for (const code of codesqr) {
      const salle = await Database.select('*').from('salles').where({id: code.id_salle})
      const item = {
        id: code.id,
        code_qr: code.code_qr,
        status: code.status,
        created_at: code.created_at,
        id_salle: salle[0].nom_salle,
        publicPath: Helpers.publicPath('/codesqr/')
      }
      data.push(item)
    }
    return view.render('codeqr/create_code',{data, salles})
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

  makeid(length){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async store ({ request, response, view }) {
    const id_salle = request.input('salle')
    const description = request.input('description')
    const code = this.makeid(6)
    const lien = `/verif_codeqr/${id_salle}/${code}`
    const data = {
      "salle_id":id_salle,
      "code":code,
      "lien":lien,
      "description": description
    }

    let stJson = JSON.stringify(data)
    const filename = `codeqr${new Date().getTime()}.png`
    const publicPath = Helpers.publicPath('/codesqr/')
    QRCode.toFile(publicPath+filename,stJson).then((err,code)=>{
      if (err) {
        console.log('une erreur sest produite')
      } else {
        console.log('qr code created')
      }
    })

    const qrcode = await Codeqr.create({ 
      id_salle : id_salle ,
      code : code ,
      lien_qr : lien ,
      code_qr : filename ,
      description : description ,
    })

    await qrcode.save()
    return response.redirect('/list_codesqr')
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
    const id = params.id_code
    const affectedRows = await Database
      .table('codeqrs')
      .where('id', id)
      .update({ status: 1 })
      
    return response.redirect('/list_codesqr')
  }
}

module.exports = CodeqrController
