const Got = require('../models/got');

const gotController = {};

gotController.index = (req, res) => {
  Got.findAll()
    .then(got => {
      let userGot = got.filter((got) => {
        return got.user_id === req.user.id;
      });
      res.render('got/got-index', {
        currentPage: 'index',
        message: 'ok',
        data: userGot,
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
  Got.create({
    name: req.body.name,
    house: req.body.house,
    actor_name: req.body.actor_name,
  }, req.user.id).then(() => {
    res.redirect('/got');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

gotController.update = (req, res) => {
  Got.update({
    name: req.body.name,
    house: req.body.house,
    actor_name: req.body.actor_name,
  }).then (got => {
    res.redirect(`/got/${req.params.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

gotController.edit = (req, res) => {
  Got.findById(req.params.id)
    .then(got => {
      res.render('got/got-single-edit', {
        currentPage: 'edit',
        data: info,
      });
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

gotController.delete = (req, res) => {
  Got.destroy(req.params.id)
    .then(() => {
      res.redirect('/got');
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = gotController;
