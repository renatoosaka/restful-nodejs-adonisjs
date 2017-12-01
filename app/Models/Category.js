'use strict'

const Model = use('Model')

class Category extends Model {
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  products() {
    return  this.hasMany('App/Models/Product')
  }
}

module.exports = Category
