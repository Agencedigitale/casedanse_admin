'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Salle extends Model {
    users() {
        return this.belongsTo('App/Models/User')
    }

    seances(){
        return this.belongsTo('App/Models/Seance')
    }

    codeqr(){
        return this.hasMany('App/Models/Codeqr')
    }
}

module.exports = Salle
