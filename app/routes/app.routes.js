module.exports = (app) => {
    const subscription = require('../controllers/app.controller.js');

    // Problem 1
    app.get('/subscribers/:month', subscription.subscribers);

    // Problem 2
    app.get('/levels/:month', subscription.levels);
}
