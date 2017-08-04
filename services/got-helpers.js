require ('isomorphic-fetch');
console.log('i exist');

function getAllegiance (req, res, next) {
  let allegiance = req.body.allegiances;
  console.log(req.body.allegiances);
  console.log(allegiance);
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
module.exports = {
  getAllegiance,
  getFather,
  getMother
}
