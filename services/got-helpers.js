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



module.exports = {
  getAllegiance,
}
