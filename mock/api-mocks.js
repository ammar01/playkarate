const karate = require('@karatelabs/karate');
karate.exec('--port=4000 --mocks=mock/api-mocks.feature');