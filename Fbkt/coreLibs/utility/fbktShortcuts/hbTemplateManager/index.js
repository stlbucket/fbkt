"use strict";
const handlebars = require('handlebars');
const R = require('ramda');
const fbkt = require('../../../../../Fbkt');

handlebars.registerHelper('json', function(context) {
	return JSON.stringify(context);
});

handlebars.registerHelper('escape', function(variable) {
	return variable.replace(/(['])/g, '$1$1');
});

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'hbTemplateManager',
		filename:       __filename,
		expectedParams: {
			libRelativePath: 'string'
		},
		pipelineParams: {
			templateResult: "getTemplateResult",
			output:					"buildOutput"
		},
		pipelineSteps: {  // any number of functions
			"getTemplateResult": function (callInfo) {
				if (callInfo.params.templateFilePath) {
					return fbkt().file.readFileWithPromise(callInfo.params.templateFilePath);
				} else if (callInfo.params.templateText) {
					return callInfo.params.templateText;
				} else {
					throw new Error('No template sql info');
				}
			},
			"buildOutput":	function (callInfo) {
				// console.log('HB TEMPLATE BUILD OUTPUT callInfo', callInfo); process.exit();
				var outputTemplate = handlebars.compile(callInfo.params.templateResult);

				return outputTemplate(callInfo.params.templateData);
			},
			"saveOutput":	function (callInfo) {
				const executionMode = callInfo.params.executionMode || 'PROD';
				
				if (executionMode.indexOf('REPORTIT') > -1) {
					var fileName = callInfo.params.reportFileName || './ignoreAllThis/templateOutput.txt';
					return fbkt().file.writeFileWithPromise({
						fileName:     fileName,
						fileContents: callInfo.params.output
					});
				} else {
					return 'PROD';
				}
			},
			"report":	function(callInfo){
				return {
					processedTemplate: 		callInfo.params.templateFilePath || callInfo.params.templateText,
					output:								callInfo.params.output
				};
			}
		}
	}, callInfo);
};