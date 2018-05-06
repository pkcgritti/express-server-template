<<<<<<< HEAD
import './db'
=======
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
>>>>>>> 41c5b2b41e61c0f062b9290549d043df155314a6
