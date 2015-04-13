var App = function (o) {
	
	var sliderCursorClicked = false;
	var cursorPosition;

	var init = function (o) {
		buildHTML(o);
	}.bind(this)

	

	var buildSlider = function () { //WARNING : INTERDEPENDENCIES !!!! 
		
		var sl = new Website.Slider({ direction : "top", gradient : "0px", className : "app-slider"});
		
		var cursor = $(sl.el).find('.cursor')[0];

		var startSliderCursor = function (touch) {
			
			return function (e) {

				e.preventDefault();
				e.stopPropagation();

				if(!touch) sliderCursorClicked = true;
				cursorPosition = $(cursor).position().top || 0; 

			}.bind(this)

		}.bind(this)

		$(cursor).on("mousedown", startSliderCursor());
		$(cursor).on("touchstart", startSliderCursor(true));


		var dragSliderCursor = this.dragSliderCursor =  function (e) { //Don't like defining it here but hey : it's convenient

			var deltaY = (e.pageY || e.originalEvent.touches[0].pageY) - $(sl.el).offset().top - cursorPosition;

			if(sliderCursorClicked) {
				
				cursorPosition += deltaY;
				$(cursor)[0].style.top = Math.min(Math.max(cursorPosition,0),$(sl.el).height() - $(cursor).height()) + "px";

				appTopRatio = Math.min(Math.max(cursorPosition/($(sl.el).height() - $(cursor).height()),0),1);				
				this.currentApplication.el.style.top = appTopRatio*($('.scene').height() - this.currentApplication.height - $('.scene').position().top) + "px";

			}
		}.bind(this)

		$(window).on("mousemove", dragSliderCursor)
		

		$(window).on("mouseup", function () {
	
			sliderCursorClicked = false;

		})
		
		return sl.el;

	}.bind(this)

	var buildHTML = function (o) {

		this.el = Tools.createHTML('app');
		this.lefter = new Website.Band({ className : 'lefter'})

		Tools.appendChildren(this.el,[this.lefter.el,'scene']);

		$(this.el).children('.app .scene')[0].appendChild(buildSlider());
		
		loadLefter(o.app.lefter)

	}.bind(this)

	this.plug = function (application) {
		
		$(this.el).children(".scene")[0].appendChild(application.el);
		
		this.currentApplication = application;
		$(this.currentApplication.el).on("touchmove", this.dragSliderCursor);

	}

	var loadLefter = function (itemArray) {

		this.lefter.addItem(itemArray)

	}.bind(this)

	init(o);
}