'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Codeqr extends Model {
    salles(){
        return this.belongsTo('App/Models/Salle')
    }
}

module.exports = Codeqr
