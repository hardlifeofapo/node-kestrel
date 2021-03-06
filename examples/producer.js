var kestrel = require('../');


//create our producer
var producer = new kestrel.kestrelProducer( 'test', {
    connectionType: kestrel.connectionType.FAILOVER,
    servers: ['127.0.0.1:22133']
});


//capture all 'stored' events
producer.on('stored', function(stored){
    console.log('Stored: ' + stored);
});


//lets input some data
var interval = setInterval( function(){
    producer.send( (new Date().getTime()) + ' - New Message' );
}, 100);


//close connection
setTimeout( function(){
    clearInterval(interval);
    producer.close();
}, 6000);