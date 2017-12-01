'use strict'

const Model = use('Model')

class Product extends Model {
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  } 

  static get hidden() {
    return ['category_id']
  }  

  category() {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Product
