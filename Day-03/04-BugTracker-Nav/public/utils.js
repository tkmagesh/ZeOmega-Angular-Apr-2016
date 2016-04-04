//Immediately Invoked Function Expression - IIFE
(function(angular, moment, undefined){
	var utils = angular.module("utils", []);
	utils.filter('trimText', function(){
		return function(text, trimLength){ /*actual filter function*/
			var trimLength = trimLength || 20;
			return text.length > trimLength ? text.substr(0,trimLength)+'...' : text;
		};
	});

	utils.value('momentApi', moment)
	utils.filter('elapsed', function(momentApi){
		return function(data){
			return momentApi(data).fromNow();
		};
	});
})(angular, window.moment);

/*
angular.module("utils", [])
	.filter('trimText', function(){
		return function(text, trimLength){ 
			var trimLength = trimLength || 20;
			return text.length > trimLength ? text.substr(0,trimLength)+'...' : text;
		};
	})
	.value('momentApi', moment)
	.filter('elapsed', function(momentApi){
		return function(data){
			return momentApi(data).fromNow();
		};
	});
*/