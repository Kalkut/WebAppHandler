var Item = function () {
	
	var init = function (o) {
		if(!o) var o = {};

		buildHTML();
		editContent(o)

	}.bind(this)

	var content;
	var title;
	var text;

	var buildHTML = function () {
		
		this.el = Tools.createHTML('item');

		Tools.appendChildren(this.el,[Tools.createHTML('picto'),content = Tools.createHTML('content')]);
		Tools.appendChildren(content,[title = Tools.createHTML('title'),text = Tools.createHTML('text')]);

	}.bind(this)

	var deleteContent = function () {
		title.innerHTML = "";
		text.innerHTML = "";
	}.bind(this)

	var editContent = function (o) {
		if(!o) return;

		if(o.title) title.innerHTML = o.title;
		if(o.text) text.innerHTML = o.text;

	}.bind(this)

	init();
}