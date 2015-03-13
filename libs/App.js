var App = function () {
	
	var init = function () {
		buildHTML();
	}.bind(this)

	var buildHTML = function () {
		
		this.el = Tools.createHTML('app');
		
		this.left = new Website.Band();
		Tools.addClass(this.left.el,'left');

		this.workspace = new Website.Workspace();
		this.workspace.addItem([
			{ 
				title : "Work Experiences", 
				className : "section"
			},
			{ 
				title : "Education",
				className : "section"
			},
			{
				title : "Interests",
				className : "section"
			}
		]);

		this.workspace.items[0].appendToContent([
			new Website.Item({ 
				topTitle : " WEB DEVELOPPER @Whibo", 
				className : "sous-section",
				title : "MAY 2014 - NOW", 
				text :"J'y ai fais beaucoup de JS parce que j'aime ça. J'aime le code, j'aime le son des touches sur le clavier, et puis avouons le : coder donne un gros air de PGM"
			}).el,
			new Website.Item({ 
				topTitle : " Chef de projet contenu @CoorpAcademy",
				title : "DECEMBER 2014 - AVRIL 2014",
				className : "sous-section", 
				text : "Je m'y suis fais exploiter comme une burne sèche"}).el
		])

		this.workspace.items[1].appendToContent([
			new Website.Item({
				topTitle : "ISART DIGITAL",
				className : "sous-section",
				title : "SEPT 2014 - NOW",
				text : "Game Design and Programming"
			}).el,
			new Website.Item({
				topTitle : "UNIVERSITE DE CERGY-PONTOISE",
				className : "sous-section",
				title : "SEPT 2012 - JUIN 2013",
				text : "M1 Informatique"
			}).el,
			new Website.Item({
				topTitle : "ENSEA",
				className : "sous-section",
				title : "SEPT 2010 - JUIN 2012",
				text : "Ecole Nationale Supérieure d'Electronique et Application"
			}).el
		])

		var picture = new Website.Preview({ title : "Bérenger Makita", comment : "UI/UX Designer"});
		this.left.plug(picture,'picture');
		this.left.addItem([
		{
			text : "I'm a web dev' yeah Mofo ! What you gonna do ?"
		},
		{
			title : "0651232138",
			text : "mobile"
		},
		{
			title : "berenger.makita@gmail.com",
			text : "personnal"
		},
		{
			title : "Eragny 95610",
			text : "DTC"
		}
		])

		Tools.appendChildren(this.el,[this.left.el,this.workspace.el]);

	}.bind(this)

	init();
}