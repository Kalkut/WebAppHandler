var Tools = {
	createHTML : function (cls,text,tag) {
		
		if(!cls) return; // RULE : no HTML without cls
		var el = document.createElement(tag || 'div');
		el.innerHTML = text || "";
		el.className = cls;
		return el;
		
	},

	appendChildren : function (father,children) {

		for(var i = 0, n = children.length; i < n; i++) father.appendChild(children[i]);

	},
	
	removeChildren : function (father,children) {

		var trueChildren = father.children;
		for(var i = 0, n = children.length; i < n; i++) if(trueChildren.indexOf(children[i]) > -1) father.removeChild(children[i]);

	},

	addClass : function (el,cls) {
		el.classList.add(cls);
	},

	removeClass : function (el,cls) {
		el.classList.remove(cls);
	},
	
	eventLoader : function (elem,events) { // events is a litteral object with properties such as "onmousemove" "onkeydown" and so on
		
	},

	noBorder : function (side) {
		if(!side) var side = "";
		
	}
}