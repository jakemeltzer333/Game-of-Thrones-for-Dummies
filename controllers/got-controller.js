//require the models
const Got = require('../models/got');

const gotController = {};
//renders the got-index view and filters the view by user
gotController.index = (req, res) => {
  Got.findAll()
    .then(got => {
      let userGot = got.filter((got) => {
        return got.user_id === req.user.id;
      });
      console.log(userGot);
      res.render('got/got-index', {
        currentPage: 'index',
        message: 'ok',
        data: got,
        user: req.user,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
};
//renders the got-single view
gotController.show = (req, res) => {
  Got.findById(req.params.id)
    .then(got => {
      res.render('got/got-single', {
        currentPage: 'show',
        message: 'ok',
        data: got,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
//shows the list of character names created by each user
gotController.create = (req, res) => {
  console.log('inside create controller ', req.user.id)
  Got.create({
    name: req.body.name,
  }, req.user.id).then(() => {
    res.redirect('/user');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};
//renders all of the information retrieved from the API in got-single view
gotController.update = (req, res) => {
  Got.update({
    culture: req.body.culture,
    born: req.body.born,
    died: req.body.died,
    titles: req.body.titles,
    aliases: req.body.aliases,
    father: res.locals.father,
    mother: res.locals.mother,
    spouse: res.locals.spouse,
    allegiances: res.locals.allegiance,
    playedBy: req.body.playedBy,
  }, req.params.id).then (got => {
    res.render('got/got-single', {
      data: got,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
//User can delete a character and remain on their user page
gotController.delete = (req, res) => {
  Got.destroy(req.params.id)
    .then(() => {
      res.redirect('/user');
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = gotController;
