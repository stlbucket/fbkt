let _graphqlSchema = null;

module.exports = (graphqlSchema) => {
  if (graphqlSchema) {
    _graphqlSchema = graphqlSchema;
  }

  return _graphqlSchema;
};