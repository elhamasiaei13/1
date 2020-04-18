// employees.js
var faker = require('faker')
function generateEmployees () {
  var lists = []
  for (var id = 0; id <18; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var email = faker.internet.email()
    lists.push({
      "id": id,
"val":{"name": firstName,
      "family": lastName,
      "email": email,
      "situation":"true"
}
      
    })
  }
  return { "employees": lists }
}
module.exports = generateEmployees
