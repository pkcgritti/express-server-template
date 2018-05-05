import './db'

import Repositories from './repositories'

Repositories.User.create({
  email: 'gritti123123@123123.com',
  password: '123123',
  username: 'gritti'
}).then(user => {
  console.log(user.username, 'created with id', user._id)
}).then(() => {
  return Repositories.User.find()
    .then(users => {
      users.forEach(user => {
        console.log(user.username, user.email)
      })
    })
})

Repositories.User.delete({})
  .then(response => {
    console.log(response)
  })
