var local_banners = [
    //"img/aigents-find.png",
	"img/aigents-timely.png",
	"img/aigents-be.png",
	"img/aigents-like.png",
	"img/aigents-stay.png",
	"img/aigents-tell.png",
	"img/aigents-start.png"	
];
var global_banners = [
                    //"en/img/aigents-find.png",
                  	"en/img/aigents-timely.png",
                	"en/img/aigents-be.png",
                	"en/img/aigents-like.png",
                	"en/img/aigents-stay.png",
                	"en/img/aigents-tell.png",
                	"en/img/aigents-start.png",
                    //"ru/img/aigents-find.png",
                  	"ru/img/aigents-timely.png",
                	"ru/img/aigents-be.png",
                	"ru/img/aigents-like.png",
                	"ru/img/aigents-stay.png",
                	"ru/img/aigents-tell.png",
                	"ru/img/aigents-start.png",
                    //"zh/img/aigents-find.png",
                  	"zh/img/aigents-timely.png",
                	"zh/img/aigents-be.png",
                	"zh/img/aigents-like.png",
                	"zh/img/aigents-stay.png",
                	"zh/img/aigents-tell.png",
                	"zh/img/aigents-start.png"	
];

var banner = -1;
function rotate() {
	banners = document.getElementById("blinker") != null ? global_banners : local_banners;
	if (banner == -1) {
		banner = Math.round(Math.random() * (banners.length - 1));
	}
	if (++banner >= banners.length) 
		banner = 0;
	rotator = document.getElementById("banner");
	if (rotator != null) {
		rotator.src = banners[banner];
		setTimeout("rotate()",10000);
	}
}

var blinked = false;
function blink() {
	blinker = document.getElementById("blinker");
	if (blinker != null) {
		if (blinked) {
			blinker.src = "./img/aigent128wb.png";
			blinked = false;
			setTimeout("blink()",5 * 1000 - 150);
		} else {
			blinker.src = "./img/aigent128wb_.png";
			blinked = true;
			setTimeout("blink()",150);
		}		
	}
}

function init() {
	rotate();
	blink();
}
