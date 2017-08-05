const Got = require('../models/got');

const gotController = {};

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

gotController.update = (req, res) => {
  console.log('made it');
  // let randTitle = req.body.titles[Math.round(Math.random() * req.body.titles.length)];
  // let randAlias = req.body.aliases[Math.round(Math.random() * req.body.aliases.length)];
  Got.update({
    culture: req.body.culture,
    titles: req.body.titles,//[randTitle],
    aliases: req.body.aliases,//[randAlias],
    father: res.locals.father,
    mother: res.locals.mother,
    allegiances: res.locals.allegiance,
    playedBy: req.body.playedBy,
  }, req.params.id).then (got => {
    console.log(got);
    res.render('got/got-single', {
      data: got,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

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
