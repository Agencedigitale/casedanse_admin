'use strict'

class CreateParent {
  get rules () {
    return {
      nom_parent:'required',
      telephone_parent:'required|unique:parents',
      lieu_habitation:'required',
    }
  }2

  get messages() {
    return {
      'required': 'Woah attention, ce champ est obligatoire.',
      'unique':'Woah attention, ce numéro de téléphone existe déjà'
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error).flashAll()

    return this.ctx.response.redirect('/add_parent')
  }
}

module.exports = CreateParent
