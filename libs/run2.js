var o = {};
var cv, app, gate;

$.when( //Multiple asynchronous calls...
	$.getJSON('content.json'),
	$.getJSON('popin.json'),
	$.getJSON('app.json'),
	$.getJSON('gate.json')
).then(function (ctt,ppin,appl,gt) {//... and one callback !
	
	console.log(ctt,ppin)
	
	o.content = ctt[0];
	o.popins = ppin[0];
	
	cv = new CV(o);
	document.body.appendChild(cv.el)
})