'use strict'

class CreateUser {
  get rules () {
    return {
      nom:'required',
      prenoms:'required',
      telephone: 'required|unique:users,',
      lieu_habitation:'required',
      salle_id:'required'
    }
  }

  get messages() {
    return {
      'required': 'Woah attention, ce champ est obligatoire.',
      'unique':'Woah attention, ce numéro de téléphone existe déjà'
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error).flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = CreateUser
