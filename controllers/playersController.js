const Account = require("../models/player");

module.exports = {


  // Metodo para obtener los jugadores
  async getAll(req, res) {

    Account.getAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al listar los jugadores",
          error: err,
        });
      }
      return res.status(201).json(data);
    });
  },


       // Metodo para actualizar los jugadores
        async update(req, res) {
            const player = req.body;  // Capturo los datos que me envie el cliente.
        
            
            Account.update(player, (err, data) => {
    
                if(err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Error updating player ',
                        error: err
                    });
                }
    
                return res.status(201).json({
                    success: true,
                    message: 'Player successfully updated',
                    data: player 
                });
    
    
            });
        },


  
};


