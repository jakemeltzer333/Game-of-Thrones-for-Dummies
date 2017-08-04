require ('isomorphic-fetch');

function getAllegiance (req, res, next) {
  fetch(`https://anapioficeandfire.com/api/houses/${name}`)
    .then(fetchRes => {
      return fetchRes.json();
    })
    .then(jsonFetchRes => {
      console.log(jsonFetchRes);
      res.locals.allegiances.name = jsonFetchRes
    })
}

module.exports = {
  getAllegiance,
}
