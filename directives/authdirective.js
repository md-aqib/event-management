const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');
const { getUser } = require('../seeders/utils')

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {  // (parent, args, context, info) = (...args)
        const [, , context] = args
        getUser(context);

        return resolve.apply(this, args);
      };
    }
  }

  module.exports = {
    AuthDirective
  }