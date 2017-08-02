const db = require('../db/config');

const Got= {};

Got.findAll = () => {
  return db.query(`
    SELECT * FROM got
    `);
}

Got.findByUserId = (user_id) => {
  return db.one(`
    SELECT * FROM got
    WHERE user_id = $1
    ` [user_id]);
}

Got.create = (got, id) => {
  return db.one(`
  INSERT INTO got
  (name, user_id)
  VALUES ($1, $2)
  RETURNING *
    `, [got.name, id]);
}

Got.update = (got, id) => {
  return db.one(`
  UPDATE got SET
  name = $1,
  WHERE id = $2
  RETURNING *
    ` [got.name, id]);
}

Got.destroy = (id) => {
  return db.none(`
  DELETE FROM got
  WHERE id = $1
    `, [id]);
}

module.exports = Got;
