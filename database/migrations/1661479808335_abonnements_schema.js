'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AbonnementsSchema extends Schema {
  up () {
    this.create('abonnements', (table) => {
      table.increments()
      table.string('prix').unique().notNullable()
      table.string('nombre').unique().notNullable()
      table.integer('status').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('abonnements')
  }
}

module.exports = AbonnementsSchema
