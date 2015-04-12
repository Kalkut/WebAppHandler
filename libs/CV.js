
var CV = function (o) {
	
	var content;

	var currentTop;
	var sceneTop;
	var cvRatio, cvHeight,cvWidth;
	this.topRatio;

	this.minTop;
	this.maxTop;

	var init = function (o) {
		
		loadContent(o);
		buildHTML(o);
	}.bind(this)

	var loadContent = function (o) {
		
		if(o) content = o.content || null;

	}.bind(this)

	var loadWorkspaceSections = function (sections) {

		this.workspace = new Website.Workspace();
		this.workspace.addItem(sections)

	}.bind(this)

	var setWorkspaceSections = function (ctt) {
		
		if(!this.workspace) return;
		
		for (var i = 0, n = ctt.length; i < n; i++) {
			this.workspace.items[i].appendToContent(ctt[i].content.map(function (x,index) {
				
				var currentClass = Tools.fromStringToClass.bind(this,ctt[i].type)();
				var itemToAdd = new currentClass(x);
				
				if (index == ctt[i].content.length - 1) Tools.addClass(itemToAdd.el,"last")
				
				return itemToAdd.el;
			}))
		}

	}.bind(this)

	var popinCallback = function (popinContent) {//don't forget to execute it !
						
		return function (popinContent) {
			
			var surlayer = new Website.Surlayer();
			var popin = new Website.Popin({surlayer : surlayer.el});
			
			Tools.appendChildren($('.app')[0],[surlayer.el,popin.el]);
			popin.addItem(popinContent)

			popin.setEvents();

		}.curry(popinContent)

	}.bind(this)

	var buildButtons = function (callbacks,className) {
		
		var buttons = [];

		for(var i = 0, n = callbacks.length; i < n; i++) {
			buttons.push(new Website.Button({
				className : className[i],
				events : {
					mouseup : callbacks[i]
				}
			}).el)
		}

		return buttons;

	}.bind(this)

	var buildSkills = function (skills) {
		for(var i = 0, n = skills.length; i <n; i++){
			this.left.el.appendChild(new Website.Slider(skills[i]).el);
		}
	}.bind(this)



	var initDimensions = function (e) {
			
		if(e) currentTop = e.originalEvent.touches[0].pageY;

		cvRatio = this.el.getBoundingClientRect().height / this.el.offsetHeight; // TEMP, HACK : performance consuming if in move
		this.height = cvHeight = $(this.el).height() * cvRatio;
		console.log(cvRatio);

	}.bind(this)

	this.initCVevents = function () {

		initDimensions();

		$(this.el).on("touchstart", initDimensions);

		//Math.max(Math.min(theoric y-position, lowest position), highest position)
		//lowest meaning  the lowest position on the page (!= lowest value of top)
		//highest ----- highest ----------------------- highest ----------

		$(this.el).on('touchmove', function (e) {
			
			e.preventDefault(); //Prevent the triger of the swipe down refresh in Chrome 
			
			var deltaY = e.originalEvent.touches[0].pageY - currentTop;
			console.log(deltaY);
			this.el.style.top = Math.max(Math.min(parseInt(cv.el.style.top || 0) + deltaY, 0),$('.scene').height() - cvHeight - $('.scene').position().top) + "px";
			this.topRatio = parseInt(cv.el.style.top)/($('.scene').height() - cvHeight - $('.scene').position().top);
			currentTop = e.originalEvent.touches[0].pageY;

			if($('.app-slider .cursor').length) $('.app-slider .cursor')[0].style.top = Math.min(parseInt(this.el.style.top)*$('.app-slider').height()/($('.scene').height() - cvHeight - $('.scene').position().top) , $('.app-slider').height() - $('.app-slider .cursor').height()) + "px";
		}.bind(this))

		$(document.body).on("mousewheel", function (e,delta) {
			
			this.el.style.top = Math.max(Math.min(((parseInt(cv.el.style.top) || 0) + delta*5),0),$('.scene').height() - cvHeight - $('.scene').position().top) + "px";
			$('.scene').height() - cvHeight - $('.scene').position().top,parseInt(cv.el.style.top)/($('.scene').height() - cvHeight - $('.scene').position().top);

			if($('.app-slider .cursor').length) $('.app-slider .cursor')[0].style.top = Math.min( parseInt(this.el.style.top)*$('.app-slider').height()/($('.scene').height() - cvHeight - $('.scene').position().top) , $('.app-slider').height() - $('.app-slider .cursor').height()) + "px";
		}.bind(this))
	}.bind(this)

	var buildHTML = function (o) {
		
		this.el = Tools.createHTML('cv');
		
		this.left = new Website.Band();
		Tools.addClass(this.left.el,'left');

		loadWorkspaceSections(content.workspace.sections);
		setWorkspaceSections(content.workspace.contents);
		
		this.workspace.items[2].appendToContent(buildButtons([popinCallback(o.popins.games),popinCallback(o.popins.science),popinCallback(o.popins.philosophy),popinCallback(o.popins.news)],[['interest','games'],['interest','science'],['interest',"philosophy"],['interest',"news"]]));


		var picture = new Website.Preview(o.content.picture);
		this.left.plug(picture,'picture');
		this.left.addItem(o.content.left);
		
		buildSkills(content.skills);

		Tools.appendChildren(this.el,[this.left.el,this.workspace.el]);

	}.bind(this)

	init(o);
}