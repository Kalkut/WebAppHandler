var Gate = function (o) {

	var atDestroyEnd;
	var atDestroyStart;

	var init = function (o) {
		if(!o) var o = {};
		
		atDestroyEnd = o.atDestroyEnd || null;
		atDestroyStart = o.atDestroyStart || null;
		buildHTML(o)
		Tools.addClass(document.body,'gate-background');

	}.bind(this)

	var buildHTML = function (o) {
		
		var links = Tools.createHTML("links");
		var wrap = Tools.createHTML("wrap")
		this.el = Tools.createHTML('gate');
		Tools.appendChildren(this.el,[new Website.Preview(o.preview).el,Tools.createHTML('text',o.text),new Website.Button({ className : "go",innerHTML : "CV", events : { mouseup : this.destroy.bind(this)}}).el]);
		
		links.appendChild(Tools.createHTML("follow",o.follow));

		Tools.appendChildren(wrap,buildLinks(o.links));
		links.appendChild(wrap);
		
		this.el.appendChild(links);

	}.bind(this)

	var buildLinks = function (linkObjects) { //ADD them in the json

		var links = [];
		var currentLinkObj;
		var el;

		for(var i = 0, n = linkObjects.length; i < n; i++) {
			currentLinkObj = linkObjects[i];

			el = Tools.createHTML("link",currentLinkObj.text,"a");

			$(el).hover(function(){
				if (!$(this).hasClass('animated')) {
					$(this).dequeue().stop().animate({ opacity : 0.6 });
				}
			}, function() {
			    $(this).addClass('animated').animate({ opacity : 1 }, "normal", "linear", function() {
					$(this).removeClass('animated').dequeue();
				});
			});
			
			el.setAttribute("href", currentLinkObj.link)
			Tools.addClass(el,currentLinkObj.className);
			
			links.push(el);

		}

		return links;
	}.bind(this)

	this.destroy = function (f) {
		
		//Tools.removeClass(document.body,'gate-background');
		var w = $(this.el).width() + 'px';
		this.el.style.right = this.el.style.right || "0px";
		
		atDestroyStart();

		$(this.el).animate({
				right : w,
			},
			{
			duration : 2000,
			complete : function () {

				this.el.parentNode.removeChild(this.el);
				Tools.removeClass(document.body,'gate-background');
				
				if(atDestroyEnd) atDestroyEnd();

			}.bind(this),
			easing : "ease"
		})


		
	}

	init(o);	
}