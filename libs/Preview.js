var Preview = function () {
	
	var init = function () {

	}.bind(this)

	var buildHTML = function () {
		this.el = Tools.createHTML('item');
		
		Tools.appendChildren(this.el,[Tools.createHTML('photo'),Tools.createHTML('title'),Tools.createHTML('comment')]);
	}
}