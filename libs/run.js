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
	o.app = appl[0];
	o.gt = gt[0];

	//Have to find a way to prevent jump in dragging top position after an orientation change
	//Think I'll change between the referiential of CV in portait and his one in landscape



	var fitCVinScene = function () {
		
		cv.el.style.top = Math.max(Math.min(($('.scene').height() - cvHeight - $('.scene').position().top)*cv.topRatio,0),$('.scene').height() - cvHeight - $('.scene').position().top) + 'px';

	};

	var centerMobileCV = function () {
		
		cvRatio = cv.el.getBoundingClientRect().width / cv.el.offsetWidth;
		cvWidth = $(cv.el).width() * cvRatio;
		cvHeight = $(cv.el).height() * cvRatio;

		var centeredLeftPos = 0.5*($('.scene').width() - cvWidth);
		

		if(cvRatio != 1) {
			$(cv.el).css({ margin : "0", right : "initial", left : centeredLeftPos })
		}

	}
	o.gt.atDestroyStart = function () {
		
		document.body.appendChild(app.el);
		
		setTimeout(centerMobileCV, 10); // Mobiles aren't powerful enough to execute this line fast enough --> setTimeout
		
		$(window).on('orientationchange', function () {
			
			setTimeout(function() { //orientationChange is not immediate, widths do not change at the same time
				centerMobileCV();
				fitCVinScene();
			}, 200 ); //200 is a good value : under 200 setTimeout is unreliable

		});

	}



	cv = new CV(o);
	app = new App(o);
	o.gt.atDestroyEnd = cv.initCVevents;

	
	gate = new Gate(o.gt);

	$(window).on("orientationchange", function (e) {
		
		if(e.orientation == "portrait") {
			setTimeout(function() {
				window.scrollTo(0,0);
			}, 200);
			console.log("ok")
		}
	})

	
	app.plug(cv);
	document.body.appendChild(gate.el);


	$('.button.go').hover(function(){
		if (!$(this).hasClass('animated')) {
			$(this).dequeue().stop().animate({ color : "#25262b", backgroundColor : "#bababa" });
		}
	}, function() {
	    $(this).addClass('animated').animate({ color : "#bababa", backgroundColor : "transparent" }, "normal", "linear", function() {
			$(this).removeClass('animated').dequeue();
		});
	});
	

})