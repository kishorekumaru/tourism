var k_slider = function (){
	$$this = this;
	$$this._slider = "#slider";
	$$this._ul = "#banner-container";
	$$this._li = ".banner-holder";
	$$this._tint = ".bg_tint";
	$$this._sp = " ";
	$$this._interval = "";
	$$this._clicking = false;
	$$this.slideCount = $($$this._ul).children().length;
	$$this.slideWidth = $($$this._ul).width();
	$$this.slideHeight = $($$this._ul).height();
	$$this.sliderUlWidth = $$this.slideCount * $$this.slideWidth;

	$$this.init = function() {
		$$this.setBannerInterval();
		$($$this._ul).mousemove($$this.mouseMoveBan);
		$($$this._ul).bind("mousedown", $$this.mouseDownBan);
		$($$this._ul).bind("mouseup", $$this.mouseUpBan);
		$($$this._li).css({ width: $$this.slideWidth, height: $$this.slideHeight });
		$($$this._ul).css({ width: $$this.sliderUlWidth, marginLeft: - $$this.slideWidth });
		$($$this._li+':last-child').prependTo($$this._ul);		
	};

	$$this.mouseMoveBan = function(event){
		console.log($$this._clicking)
	};

	$$this.mouseDownBan = function(){
		console.log($$this._clicking)
		 $$this._clicking = true;
	};

	$$this.mouseUpBan = function(){
		$$this._clicking  = false;
		console.log("this is test");
	};

	$$this.setBannerInterval = function(){
		$$this._interval = setInterval(function () {
			$$this.moveRight();
		}, 10000);		
	};

	$$this.clearBannerInterval = function (){
		clearInterval($$this._interval);
	};

	$$this.moveLeft = function() {
		$$this.clearBannerInterval();
		$($$this._ul).animate({
			left: + $$this.slideWidth
		}, 1200, "easeInOutExpo", function () {
			$($$this._li+':last-child').prependTo($$this._ul);
			$($$this._ul).css('left', '');
			$$this.setBannerInterval();
		});
	};

	$$this.moveRight = function() {
		$$this.clearBannerInterval();
		$($$this._ul).animate({
			left: - $$this.slideWidth
		}, 1200, "easeInOutExpo", function () {
			$($$this._li+':first-child').appendTo($$this._slider + $$this._sp + $$this._ul);
			$($$this._ul).css('left', '');
			$$this.setBannerInterval();
		});
	};
}


function setSlider(){
	var slider_obj = new k_slider();
	slider_obj.init();

	$('a.control_pre').click(function () {
		slider_obj.moveLeft();
	});

	$('a.control_next').click(function () {
		slider_obj.moveRight();
	});

};
