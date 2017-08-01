const db = require('../db/config');

const Got= {};

Got.findAll = () => {
  // return db.query(`
  //   SELECT * FROM got
  //   // JOIN info ON got.id = info.id
  //   // ORDER BY got.id ASC`);
  return db.query(`
    SELECT * FROM got
    `);
}

Got.findById = (id) => {
  return db.one(`
  SELECT * FROM got
  JOIN info ON got.id = info.id
  WHERE got.id = $1
    `, [id]);
}

Got.create = (got, id) => {
  return db.one(`
  INSERT INTO got
  (name, house, actor_name, user_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *
    `, [got.name, got.house, got.actor_name, id]);
}

Got.update = (got, id) => {
  return db.one(`
  UPDATE got SET
  name = $1,
  house = $2,
  actor_name = $3
  WHERE id = $4
  RETURNING *
    ` [got.name, got.house, got.actor_name, id]);
}

Got.destroy = (id) => {
  return db.none(`
  DELETE FROM got
  WHERE id = $1
    `, [id]);
}

module.exports = Got;
