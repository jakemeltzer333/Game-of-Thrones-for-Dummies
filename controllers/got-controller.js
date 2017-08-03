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

// gotController.show = (req, res) => {

//   Got.findByUserId(req.params.id)
//     .then(got => {

//       res.render('/got', {
//         currentPage: 'show',
//         message: 'ok',
//         data: got,
//       });
//     }).catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// };

gotController.create = (req, res) => {
  console.log('inside create controller ', req.user.id)
  Got.create({
    name: req.body.name,
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
  }).then (got => {
    res.redirect(`/got/${req.params.id}`);
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
