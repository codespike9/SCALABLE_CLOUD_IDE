const { ObjectId } = require("mongodb");
const MongoClient = require('../mongoDbClient');

async function connectToCollection(dbName, collectionName) {
  await MongoClient.connect();
  const db = MongoClient.db(dbName);
  return db.collection(collectionName);
}

// Insert a single document
async function insertOne(dbName, collectionName, document) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.insertOne(document);
}

// Insert multiple documents
async function insertMany(dbName, collectionName, documents) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.insertMany(documents);
}

// Find a single document
async function findOne(dbName, collectionName, query = {}, options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.findOne(query, options);
}

// Find multiple documents
async function findMany(dbName, collectionName, query = {}, options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.find(query, options).toArray();
}

// Aggregate documents
async function aggregate(dbName, collectionName, pipeline = [], options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.aggregate(pipeline, options).toArray();
}

// Update a single document
async function updateOne(dbName, collectionName, filter, updateDoc, options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.updateOne(filter, { $set: updateDoc }, options);
}

// Update multiple documents
async function updateMany(dbName, collectionName, filter, updateDoc, options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.updateMany(filter, { $set: updateDoc }, options);
}

// Find a document by ID
async function findById(dbName, collectionName, id, options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.findOne({ _id: new ObjectId(id) }, options);
}

// Find and update a document
async function findOneAndUpdate(dbName, collectionName, filter, updateDoc, options = {}) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.findOneAndUpdate(filter, { $set: updateDoc }, { returnDocument: "after", ...options });
}

// Delete a single document
async function deleteOne(dbName, collectionName, filter) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.deleteOne(filter);
}

// Delete multiple documents
async function deleteMany(dbName, collectionName, filter) {
  const collection = await connectToCollection(dbName, collectionName);
  return collection.deleteMany(filter);
}

// Close the MongoDB MongoClient connection
async function closeConnection() {
  await MongoClient.close();
}

module.exports = {
  insertOne,
  insertMany,
  findOne,
  findMany,
  aggregate,
  updateOne,
  updateMany,
  findById,
  findOneAndUpdate,
  deleteOne,
  deleteMany,
  closeConnection,
};
