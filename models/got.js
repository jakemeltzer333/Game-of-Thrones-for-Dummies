const db = require('../db/config');

const Got= {};

Got.findAll = () => {
  return db.query(`
    SELECT * FROM got
    JOIN info ON got.id = info.got_id
    ORDER BY got.id ASC`);
}

Got.findById = (id) => {
  return db.one(`
  SELECT * FROM got
  JOIN info ON got.id = info.got_id
  WHERE got.id = $1
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
