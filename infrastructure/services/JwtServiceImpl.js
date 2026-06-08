const JwtService = require('../../domain/services/JwtService');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class JwtServiceImpl extends JwtService {
  async sign(payload, options = {}) {
    return jwt.sign(payload, keys.secretOrKey, options);
  }
}

module.exports = JwtServiceImpl;
