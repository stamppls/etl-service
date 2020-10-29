const controller = require('./controller');

module.exports = (app) => {
    app.route('/connect')
        .post(controller.connect)
    
    // app.route('/extract')
    //     .post(controller.extract)

    app.route('/etl')
        .post(controller.extract,controller.transform,controller.load)
}