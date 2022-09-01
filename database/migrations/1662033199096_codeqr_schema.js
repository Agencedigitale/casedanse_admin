'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodeqrSchema extends Schema {
  up () {
    this.create('codeqrs', (table) => {
      table.increments()
      table.string('code').notNullable()
      table.integer('id_salle').unsigned().references('id').inTable('salles')
      table.string('lien_qr').notNullable()
      table.string('code_qr').notNullable()
      table.text('description').nullable()
      table.integer('status').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('codeqrs')
  }
}

module.exports = CodeqrSchema
