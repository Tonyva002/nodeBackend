const db = require('../config/config');
const Player = {};

Player.getAll = ( result) => {
    const sql = 
    `SELECT
        p.id,
        p.cedula_passport,
        p.ghin,
        p.handicap,
        p.updated_at,
        p.playing_handicap,
        p.diestro,
        p.patrocinador,
        p.name,
        p.image,
        p.team,
        p.foursome,
        p.other_pair_document,
        p.created_at,
        p.description,
        p.favorite
     From
        players as p
     ORDER BY
        p.id
    `;
    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            } else {
                console.log('Jugadores obtenidos: ', data);
                result(null, data);
            }
        }

    )

};

Player.update = (player, result) => {
    const sql = `
      UPDATE
          players as p
      SET
       p.cedula_passport = ?,
       p.ghin = ?,
       p.handicap = ?,
       p.updated_at = ?
       p.playing_handicap = ?,
       p.diestro = ?,
       p.patrocinador = ?,
       p.name = ?,
       p.image = ?,
       p.team = ?,
       p.foursome = ?,
       p.other_pair_document = ?,
       p.description = ?,
        p.favorite = ?
       
      WHERE
          id = ?    
      `;
    db.query(
      sql,
      [player.cedula_passport, 
        player.ghin, 
        player.handicap, 
        new Date,
        player.playing_handicap, 
        player.diestro,
        player.patrocinador,
        player.name,
        player.image,
        player.team,
        player.foursome,
        player.other_pair_document,
        player.description,
        player.favorite,
        player.id],
  
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
        } else {
          console.log("Jugadores actualizados: ", player.id);
          result(null, player.id);
        }
      }
    );
  };


module.exports = Player;