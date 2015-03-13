var Website = {
	
	Item : function (o) { // Create an item to use in a list
	
		var init = function (o) {
			buildHTML(o);
			editContent(o)
		}.bind(this)

		var content;
		var title;
		var text;
		var picto;

		var buildHTML = function (o) {
			
			this.el = Tools.createHTML('item');
			if(o && o.className) this.el.classList.add(o.className);

			Tools.appendChildren(this.el,[picto = Tools.createHTML( o.topTitle ? 'top-title' : 'picto'),content = Tools.createHTML('content')]);
			Tools.appendChildren(content,[title = Tools.createHTML('title'),text = Tools.createHTML('text')]);

		}.bind(this)

		var deleteContent = function () {
			
			content.innerHTML = "";

		}.bind(this)

		var editContent = function (o) {
			
			if(!o) return;
			if(o.picto) picto.style.BackgroundImage = "url(" + o.picto + ")";
			if(o.title) title.innerHTML = o.title;
			if(o.text) text.innerHTML = o.text;
			if(o.topTitle) this.pictoIsText(o.topTitle);

		}.bind(this)

		this.appendToContent = function (domObj) {

			domObj.length >= 0 ?  Tools.appendChildren(content,domObj) : content.appendChild(domObj);
		}

		this.pictoIsText = function (text) {
			picto.style.BackgroundImage = "";
			picto.innerHTML = text;
		}.bind(this)



		init(o);
	},

	Band : function () { // Create a band (header, footer, left, right)

		var init = function () {
			this.items = [];
			buildHTML();

		}.bind(this)

		var buildHTML = function () {
			
			this.el = Tools.createHTML('band');

		}.bind(this)

		this.addItem = function (itemArray) {
			
			if(!itemArray.length) return;

			var newItems = [];

			for(var i = 0, n = itemArray.length ; i < n; i++ ) {
				
				newItems.push(new Website.Item(itemArray[i]));

			}

			//this.items.push.apply(this.items,newItems);
			this.items = this.items.concat(newItems);
			console.log(this.items);
			Tools.appendChildren(this.el,newItems.map(function (elem) { return elem.el }));

		}

		this.removeItem = function (n) {
			if(!n) var n = 1;

			var oldItems = [];

			for (var i = 0; i < n; i++) {

				oldItems.push(this.items[n-i-1]);
				this.items.pop();

			}

			Tools.removeChildren(this.el,oldItems);

		}

		this.plug = function (obj,property) {
			if (!property) {
				console.error("No new property was defined.")
				return;
			}
			else if (this[property]) {
				console.info("The property " + property + " was overwritten.");
			}

			this[property] = obj;
			this.el.appendChild(obj.el);

		}

		init();

	},

	Preview : function (o) { // Picture,title and comment
	
		var init = function (o) {
			buildHTML();
			editContent(o)
		}.bind(this)

		var title;
		var comment;

		var buildHTML = function () {
			
			this.el = Tools.createHTML('preview');
			
			Tools.appendChildren(this.el,[Tools.createHTML('photo'),title = Tools.createHTML('title'), comment = Tools.createHTML('comment')]);

		}.bind(this)

		var editContent = function (o) {
			title.innerHTML = o.title;
			comment.innerHTML = o.comment;
		}
		
		init(o);
	},

	Workspace : function () { // workspace in a WebApp


		var init = function () {
			this.items = [];
			buildHTML();
		}.bind(this)

		var buildHTML = function () {

			this.el = Tools.createHTML('workspace');

		}.bind(this)

		this.addItem = new Website.Band().addItem.bind(this);
		this.removeItem = new Website.Band().removeItem.bind(this);
		this.plug = new Website.Band().plug.bind(this);

		init();
	}
}