'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeancesSchema extends Schema {
  up () {
    this.create('seances', (table) => {
      table.increments()
      table.string('jour').notNullable()
      table.date('date').nullable()
      table.integer('salle_id').unsigned().references('id').inTable('salles')
      table.string('status').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('seances')
  }
}

module.exports = SeancesSchema
