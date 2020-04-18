// rate.js
var faker = require('faker')
function rate () {
  var lists = []
  for (var id = 0; id <180; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var email = faker.internet.email()
    var city = faker.address.city()
    lists.push({
"totalPages":"400",
"elements":{
	"code":id,
	"nameLocal":city,
	"nameEn":"nameEn",
	"regionCode":"regionCode",
	"regionNameLocal":"regionNameLocal",
	"regionNameEn":"regionNameEn",
	"country":"country",
	"countryNameLocal":"countryNameLocal",
	"countryNameEn":"countryNameEn",
      	
    }
})
  }
  return { "rate": lists }
}
module.exports = rate
