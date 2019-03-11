const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

const findAll = async entityType => {
  const query = datastore.createQuery(entityType);
  const [entities] = await datastore.runQuery(query);
  return entities.map(entity => ({ id: entity[datastore.KEY].id, ...entity }));
};

const findOneById = async (entityType, entityId) => {
  const key = datastore.key([entityType, parseInt(entityId)]);
  const found = await datastore.get(key);
  if (!found[0]) {
    return null;
  }
  return { id: found[0][datastore.KEY].id, ...found[0] };
};

const saveOne = async (itemType, item) => {
  const key = datastore.key(itemType);
  await datastore.save({ key, data: item });
  return key;
};

module.exports = { findAll, findOneById, saveOne };
