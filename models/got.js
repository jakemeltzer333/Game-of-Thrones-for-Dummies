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
  born = $2,
  died = $3,
  titles = $4,
  aliases = $5,
  father = $6,
  mother = $7,
  spouse = $8,
  allegiances = $9,
  playedBy = $10
  WHERE id = $11
  RETURNING *
    `, [got.culture, got.born, got.died, got.titles, got.aliases, got.father, got.mother, got.spouse, got.allegiances, got.playedBy, id]);
}

Got.destroy = (id) => {
  return db.none(`
  DELETE FROM got
  WHERE id = $1
    `, [id]);
}

module.exports = Got;
