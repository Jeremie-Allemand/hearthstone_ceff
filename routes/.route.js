module.exports = (app) => {
    const ctrl = require('../controllers/.controller')
    app.post('/addplayer',ctrl.addPlayer)
}