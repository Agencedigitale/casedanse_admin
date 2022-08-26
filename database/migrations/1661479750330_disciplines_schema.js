'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplinesSchema extends Schema {
  up () {
    this.create('disciplines', (table) => {
      table.increments()
      table.string('discpline').unique().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('disciplines')
  }
}

module.exports = DisciplinesSchema
