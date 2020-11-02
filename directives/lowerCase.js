const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class LowerCaseDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        const result = await resolve.apply(this, args);
        if (typeof result === 'string') {
          return result.toLowerCase();
        }
        return result;
      };
    }
  }

  module.exports = {
    LowerCaseDirective
  }