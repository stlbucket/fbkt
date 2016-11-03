var fbkt = require('../../../fbkt');

module.exports = function(callInfo){
	console.log('==========LOAD DB TREE==========');

	if (fbkt().libs.dbAccess) {
		var rebuild = callInfo ? callInfo.rebuild === true : false;
		return fbkt().libs.dbAccess.dbTree({
			params: {
				rebuild:     rebuild
			}
		});
	}
};


//
// module.exports = function(callInfo){
// 	console.log('==========LOAD DB TREE==========');
//
// 	if (fbkt().libs.dbAccess){
// 		return fbkt().libs.dbAccess.getDbStructure()
// 		// return fbkt().libs.dbAccess.structure(callInfo)
// 			.then(function(dbStructure){
// 				// fbkt().clog('dbStructure', dbStructure, true); process.exit();
// 				var rebuild = callInfo ? callInfo.rebuild === true : false;
// 				return fbkt().libs.dbAccess.dbTree({
// 					params: {
// 						dbStructure: dbStructure,
// 						rebuild:     rebuild
// 					}
// 				});
// 			});
// 	}
// };
