//require fetch
require ('isomorphic-fetch');
//middleware helper that makes a fetch call to get name of character's
//allegiance from the API.
function getAllegiance (req, res, next) {
  let allegiance = req.body.allegiances;

  fetch(allegiance)
    .then(fetchRes => {
      return fetchRes.json();
    })
    .then(jsonFetchRes => {
      console.log(jsonFetchRes);
      res.locals.allegiance = jsonFetchRes.name;
      next();
    }).catch(err => {
      console.log(err);
      next();
    })
  }
//middleware helper that makes a fetch call to get name of character's
//father from the API.
function getFather (req, res, next) {
  let father = req.body.father;
  fetch(father)
    .then(fetchRes => {
      return fetchRes.json();
    })
    .then(jsonFetchRes => {
      res.locals.father = jsonFetchRes.name;
      next();
    }).catch(err => {
      console.log(err);
      next();
    })
}
//middleware helper that makes a fetch call to get name of character's
//mother from the API.
function getMother (req, res, next) {
  let mother = req.body.mother;
  fetch(mother)
  .then(fetchRes => {
    return fetchRes.json();
  })
  .then(jsonFetchRes => {
    res.locals.mother = jsonFetchRes.name;
    next();
  }).catch(err => {
    console.log(err);
    next();
  })
}

function getSpouse (req, res, next) {
  let spouse = req.body.spouse;
  fetch(spouse)
  .then(fetchRes => {
    return fetchRes.json();
  })
  .then(jsonFetchRes => {
    res.locals.spouse = jsonFetchRes.name;
    next();
  }).catch(err => {
    console.log(err);
    next();
  })
}
//export helper functions to my routes.
module.exports = {
  getAllegiance,
  getFather,
  getMother,
  getSpouse
}
