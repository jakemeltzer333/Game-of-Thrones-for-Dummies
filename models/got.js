const db = require('../db/config');

const Got= {};

Got.findAll = () => {
  return db.query('SELECT * FROM got ORDER BY id');
}

Got.findById = (id) => {
  return db.one(`
  SELECT * FROM got
  WHERE id = $1
    `, [id]);
}

Got.create = (got) => {
  return db.one(`
  INSERT INTO got
  (name, house, actor_name)
  VALUES ($1, $2, $3)
  RETURNING *
    `, [got.name, got.house, got.actor_name]);
}

Got.destroy = (id) => {
  return db.none(`
  DELETE FROM got
  WHERE id = $1
    `, [id]);
}

module.exports = Got;
