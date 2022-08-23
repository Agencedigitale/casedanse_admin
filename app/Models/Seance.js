'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Seance extends Model {
    salles(){
        this.hasMany('App/Models/Salle')
    }
}

module.exports = Seance
