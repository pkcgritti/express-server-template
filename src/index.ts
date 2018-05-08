import Repositories from './repositories'

Repositories.User.find()
  .then(users => {
    users.forEach(user => {
      console.log(`${user.username} with password ${user.password} with email ${user.email ? user.email.value : ''}`)
    })
  })

Repositories.User.createOne({ username: 'cesargritti', password: '123123', email: { value: 'cesargritti@gmail.com' } })