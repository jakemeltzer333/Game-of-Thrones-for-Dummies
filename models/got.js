const db = require('../db/config');

const Got= {};

Got.findAll = () => {
  return db.query(`
    SELECT * FROM got
    ORDER BY id ASC
    `);
}

Got.findById = (id) => {
  return db.one(`
    SELECT * FROM got
    WHERE id = $1
    `, [id]);
}

Got.create = (got, userid) => {
  return db.one(`
  INSERT INTO got
  (name, user_id)
  VALUES ($1, $2)
  RETURNING *
    `, [got.name, userid]);
}

Got.update = (got, id) => {
  return db.one(`
  UPDATE got SET
  culture = $1,
  titles = $2,
  aliases = $3,
  father = $4,
  mother = $5,
  allegiances = $6,
  playedBy = $7
  WHERE id = $8
  RETURNING *
    `, [got.culture, got.titles, got.aliases, got.father, got.mother, got.allegiances, got.playedBy, id]);
}

Got.destroy = (id) => {
  return db.none(`
  DELETE FROM got
  WHERE id = $1
    `, [id]);
}

module.exports = Got;
