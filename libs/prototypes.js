Function.prototype.curry = function () {// A tasty exotic function partial evaluation method --> no more closure needed !
	var self = this;
	var args = Array.prototype.slice.call(arguments);
	return function () {
		return self.apply([], args.concat(Array.prototype.slice.call(arguments)));
	}
}