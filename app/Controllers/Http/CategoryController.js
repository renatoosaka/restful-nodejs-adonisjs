'use strict'

const Category = use('App/Models/Category')

class CategoryController {

  async all () {
    return { categories: await Category.query().with('products').fetch() }
  }

  async one ({ params }) {
    return { category: await Category.find( params.id ) }
  }

  async save ({ request }) {
    const categoryData = request.only( [ 'name' ] )

    const category = await Category.create( categoryData )
    
    return { category }
  }

  async update ({ request }) {
    const { id, name } = request.all()

    const category = await Category.find( id )

    category.name = name

    await category.save()

    return { category }
  }

  async delete ({ params }) {
    const category = await Category.find( params.id )

    await category.delete()

    return {
      category,
      message: 'Categoria removida com sucesso!'
    }
  }
}

module.exports = CategoryController
