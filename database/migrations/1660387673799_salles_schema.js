'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SallesSchema extends Schema {
  up () {
    this.create('salles', (table) => {
      table.increments()
      table.string('nom_salle')
      table.string('precision')
      table.timestamps()
    })
  }

  down () {
    this.drop('salles')
  }
}

module.exports = SallesSchema
