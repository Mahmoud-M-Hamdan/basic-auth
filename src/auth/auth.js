'use strict';



const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { User } = require("../models/index");





async function signUp(req, res, next) {

  // we need to parse the data from the body req
  try {
    // hash the password within the req body
    req.body.password = await bcrypt.hash(req.body.password, 5);
    // create the new user Record 
    const record = await User.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error occurred");
  }

;}

async function signIn(req, res, next) {
  try {
    const encodedHeaders = req.headers.authorization.split(' ')[1]; // "Basic dGFtaW06cGl6emE="
    const [username, password] = base64.decode(encodedHeaders).split(':'); // spread operator
    console.log('username: ', username);
    console.log('password: ', password); // password in plain text after base64 decoding

    // get the user form the database 
    const user = await User.findOne({ where: { username } });
    // compare the User' password from the DB with the on that was submitted in the form
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      res.status(500).json({ 'error': 'username or password incorrect!' })
    }
  } catch (error) {
    res.status(403).send("An Error Occurred!");
  }
}




module.exports = {
    signUp :signUp,
    signIn: signIn,
}