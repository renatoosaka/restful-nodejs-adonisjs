'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Logger = use('Logger')

class UserController {
  async auth({ request, auth }) {
    const { email, senha } = request.all()
    
    const usuario = await User.query().where({email}).first()

    return await auth.generate(usuario, true)
  }
}

module.exports = UserController
