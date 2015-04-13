var Tools = {
	addClass : function (el,cls) {
		
		typeof(cls) == "object" && cls.length ? el.classList.add.apply(el.classList,cls) : el.classList.add(cls);

	},

	createHTML : function (cls,text,tag) {
		
		if(!cls) return; // RULE : no HTML without cls
		var el = document.createElement(tag || 'div');
		el.innerHTML = text || "";
		Tools.addClass(el,cls);
		return el;
		
	},

	isDomElement : function (el) {
		
		var r;
		el && el.tagName ? r = true : r = false;
		
		return r;

	},

	appendChildren : function (father,children) {
		
		if(!Tools.isDomElement(father)) return;

		for(var i = 0, n = children.length; i < n; i++){
			
			if(Tools.isDomElement(children[i])) father.appendChild(children[i]);
			else if(typeof(children[i]) == "string") father.appendChild(Tools.createHTML(children[i])); 
			else if (console && console.info) console.info("Tools : The element of index " + i + " and of value "+ children[i] + " is not a DOM Element. It has not been added");

		} 

	},
	
	removeChildren : function (father,children) {

		var trueChildren = father.children;
		for(var i = 0, n = children.length; i < n; i++) if(trueChildren.indexOf(children[i]) > -1) father.removeChild(children[i]);

	},

	removeClass : function (el,cls) {
		el.classList.remove(cls);
	},
	
	eventLoader : function (elem,events) { // events is a litteral object with properties such as "onmousemove" "onkeydown" and so on
		
	},

	noBorder : function (side) {
		if(!side) var side = "";
		
	},

	fromStringToClass : function (strg,scope) {// This function better be binded when using it without a scope
		if(!strg) return;
		var namespaces = strg.split(".");
		var cls = scope || this;
		for (var i = 0, n = namespaces.length; i < n; i++) {
			cls = cls[namespaces[i]];
		}

		return cls;
	}
}