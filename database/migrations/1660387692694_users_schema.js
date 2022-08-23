'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nom', 80).notNullable()
      table.string('prenoms', 80).notNullable()
      table.string('telephone', 254).notNullable().unique()
      table.integer('user_type').notNullable() //0 - danseur 1 - administrateur
      table.integer('uptodate').defaultTo(0) //0 - client pas à jour 1 - client à jour
      table.string('lieu_habitation').notNullable()
      table.string('lieu_travail').nullable()
      table.string('password').nullable()
      table.integer('salle_id').unsigned().references('id').inTable('salles')
      table.integer('parent_id').unsigned().references('id').inTable('parents')
      table.integer('status').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
