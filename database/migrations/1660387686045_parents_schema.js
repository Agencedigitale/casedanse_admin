'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParentsSchema extends Schema {
  up () {
    this.create('parents', (table) => {
      table.increments()
      table.string('nom_parent').notNullable()
      table.string('telephone_parent').notNullable().unique()
      table.string('lieu_habitation').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('parents')
  }
}

module.exports = ParentsSchema
