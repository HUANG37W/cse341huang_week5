const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
  console.log("getAll");
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
} catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
}

const getSingle = async (req, res, next) => {
  try{
  console.log("getSingle");
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
} catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
}

const createContact = async (req, res, next) => {
  if (!req.body.Name) {
    res.status(400).send({ message: 'Data to update can not be empty!' });
  }
  try{
  const contact = {
    Name: req.body.Name,
    Miles_per_Gallon: req.body.Miles_per_Gallon,
    Cylinders: req.body.Cylinders,
    Displacement: req.body.Displacement,
    Horsepower: req.body.Horsepower,
    Weight_in_lbs: req.body.Weight_in_lbs,
    Acceleration: req.body.Acceleration,
    Year: req.body.Year,
    Origin: req.body.Origin
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
} catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
}


const updateContact = async (req, res) => {
  if (!req.body.Name) {
    res.status(400).send({ message: 'Data to update can not be empty!' });
  }
  try{
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    Name: req.body.Name,
    Miles_per_Gallon: req.body.Miles_per_Gallon,
    Cylinders: req.body.Cylinders,
    Displacement: req.body.Displacement,
    Horsepower: req.body.Horsepower,
    Weight_in_lbs: req.body.Weight_in_lbs,
    Acceleration: req.body.Acceleration,
    Year: req.body.Year,
    Origin: req.body.Origin
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
} catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
}

const deleteContact = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
} catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
}


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact};
