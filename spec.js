const Rx = require('rxjs');
const fbkt = require('./index');


const source = Rx.Observable.range(1,7);

var subscription = source.subscribe(
	x => console.log(fbkt.ping(x)),
	e => console.log('onError: %s', e),
	() => console.log('onCompleted')
);

