var promisedHandlebars = require('../')
var Q = require('q')
var Handlebars = promisedHandlebars(require('handlebars'), { Promise: Q.Promise })

// Register a helper that returns a promise
// Helpers do not have to return a promise of the sane
Handlebars.registerHelper('helper', function (value) {
  return Q.delay(100).then(function () {
    return value
  })
})

var template = Handlebars.compile('123{{helper a}}456{{helper b}}')

// The whole compiled function returns a promise as well
template({
  a: 'abc',
  b: 'xyz'
}).done(console.log)
