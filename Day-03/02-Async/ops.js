var ops = (function(){
	function addSync(x,y){
		console.log('[Provider] adding ', x , ' and ', y);
		var result = x + y;
		console.log('[Provider] return result');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[Consumer] trigger addSync');
		var result = addSync(x,y);
		console.log('[Consumer] result = ', result);
	}

	function addAsync(x,y, onResult){
		console.log('[Provider] adding ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('[Provider] return result');
			if (typeof onResult === 'function')
				onResult(result);
		}, 3000);
	}

	function addAsyncClient(x,y){
		console.log('[Consumer] trigger addAsync');
		addAsync(x,y, function(result){
			console.log('[Consumer] result = ', result);
		});
	}

	function addAsyncPromise(x,y){
		console.log('[Provider] adding ', x , ' and ', y);
		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log('[Provider] return result');
				resolveFn(result);
			}, 3000);
		});
		return promise;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncPromise : addAsyncPromise
	}
})();