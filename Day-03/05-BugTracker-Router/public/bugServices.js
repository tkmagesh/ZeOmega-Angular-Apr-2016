bugTrackerApp.value("defaultBugName", "[Default Bug]");


bugTrackerApp.factory("bugOperations", function(defaultBugName){
	return {
		create : function(bugName){
			bugName = bugName || defaultBugName;
			return {
				id : 0,
				name : bugName,
				isClosed : false,
				createdAt : new Date()
			};
		},
		toggle : function(bug){
			bug.isClosed = !bug.isClosed;
		}
	}
});

bugTrackerApp.service("bugService", function($http, $q){
	/*this.getAll = function(){
		var deferred = $q.defer();
		
		var httpPromise = $http.get("http://localhost:4000/bugs");
		httpPromise.then(function(response){
			var result = response.data;
			deferred.resolve(result);
		});

		return deferred.promise;
	}*/

	this.getAll = function(){
	
		/*var httpPromise = $http.get("http://localhost:4000/bugs");
		var resultPromise = httpPromise.then(function(response){
			var result = response.data;
			return result;
		});

		return resultPromise;*/

		return $http
			.get("http://localhost:4000/bugs")
			.then(function(response){
				return response.data;
			});
	};

	this.save = function(bug){
		var p = null;
		if (bug.id){
			p = $http.put("http://localhost:4000/bugs/" + bug.id, bug);
		} else {
			p = $http.post("http://localhost:4000/bugs", bug);
		}
		return p.then(function(response){
			return response.data;
		});
	};

	this.delete = function(bug){
		return $http.delete("http://localhost:4000/bugs/" + bug.id);
	};

	this.getById = function(id){
		return $http
			.get("http://localhost:4000/bugs/" + id)
			.then(function(response){
				return response.data;
			});
	}
});

bugTrackerApp.service("bugsCollection", function(bugOperations, bugService){
	this.list = [];
	var self = this;

	var p = bugService.getAll();
	p.then(function(bugs){
		self.list = bugs;
	});

	this.addNew = function(newBugName){
		bugService
			.save(bugOperations.create(newBugName))
			.then(function(bug){
				self.list.push(bug);	
			});
	};

	this.toggle = function(bug){
		bugOperations.toggle(bug);
		bugService.save(bug);
	};

	this.removeClosed = function(){
		for(var i = self.list.length-1; i>=0; i--)
			if (self.list[i].isClosed){
				bugService.delete(self.list[i]);
				self.list.splice(i,1);
			}
	};



});

bugTrackerApp.filter('closedCount', function(){
	return function(bugs){
		var result = 0;
		bugs = bugs || [];
		for(var i=0; i<bugs.length; i++)
			if (bugs[i].isClosed)
				++result;
		return result;
	}
});	