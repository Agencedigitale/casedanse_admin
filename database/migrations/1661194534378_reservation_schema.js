'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.create('reservations', (table) => {
      table.increments()
      table.integer('seance_id').unsigned().references('id').inTable('seances')
      table.integer('salle_id').unsigned().references('id').inTable('salles')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('reservations')
  }
}

module.exports = ReservationSchema
