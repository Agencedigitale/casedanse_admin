'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JourSeancesSchema extends Schema {
  up () {
    this.create('jour_seances', (table) => {
      table.increments()
      table.integer('seance_id').unsigned().references('id').inTable('seances')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('heure_arrivee').notNullable()
      table.string('heure_depart').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('jour_seances')
  }
}

module.exports = JourSeancesSchema
