const LowerCaseDirective = require('./lowerCase').LowerCaseDirective
const AuthDirective = require('./authdirective').AuthDirective

const schemaDirectives = {
    lower: LowerCaseDirective,
    auth: AuthDirective
  }

module.exports = schemaDirectives;