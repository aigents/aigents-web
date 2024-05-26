var menu_right; //right edge of menu area
var view_top; //top edge of view area
var gadg_top; //top edge of gadgets area
var menu_wnd;
var tabs_wnd;
var view_wnd; 
var gadg_wnd;
var menu_bar;
var tabs_bar;
var gadg_bar; 
var old_client_width;
var old_client_height;
var new_client_width;
var new_client_height;

function liquid_lazy_init()
{
	if (menu_wnd == null)
	{
		menu_wnd = document.getElementById("menu_wnd");
		tabs_wnd = document.getElementById("tabs_wnd");
		view_wnd = document.getElementById("view_wnd"); 
		gadg_wnd = document.getElementById("gadg_wnd");
		menu_bar = document.getElementById("menu_bar");
		tabs_bar = document.getElementById("tabs_bar");
		gadg_bar = document.getElementById("gadg_bar"); 
	}
}

function liquidDetectSize()
{
	if (window.innerWidth)
	{
		new_client_width = window.innerWidth;
		new_client_height= window.innerHeight;
	}
	else
	{
		new_client_width = document.body.clientWidth;
		new_client_height= document.body.clientHeight;
	}
}

function liquidUpdateOnLoad()
{
	liquid_lazy_init();
	liquidDetectSize();
	liquidUpdate(new_client_width,new_client_height);
}

function liquidUpdateOnReSize()
{
	liquid_lazy_init();
	liquidDetectSize();
	liquidUpdate(new_client_width,new_client_height);
}

function liquidUpdate(new_client_width,new_client_height)
{
	if (!old_client_height)//first time here
	{
		var split_left_px = 0.25 * new_client_width;
		var split_right_top_px = 0.1 * new_client_height;
		var split_right_bottom_px = 0.9 * new_client_height;
//alert(new_client_height+"/"+split_right_top_px+"/"+split_right_bottom_px);
	}
	else //have been here earlier
	{
		//remember current location of gadgets
		var split_left_px = parseInt(menu_bar.style.left)+1;
		var split_right_top_px = parseInt(tabs_bar.style.top)+1;
		var split_right_bottom_px = parseInt(gadg_bar.style.top)+1;
		
		var split_left_pc = split_left_px / old_client_width;
		var split_right_top_pc = split_right_top_px / old_client_height;
		var split_right_bottom_pc = split_right_bottom_px / old_client_height;

		var split_left_px = split_left_pc * new_client_width;
		var split_right_top_px = split_right_top_pc * new_client_height;
		var split_right_bottom_px = split_right_bottom_pc * new_client_height;
	}
	old_client_width = new_client_width;
	old_client_height = new_client_height;

	menu_wnd.style.height = "" + new_client_height + "px";
	menu_bar.style.height = "" + new_client_height + "px";
	
	menu_wnd.style.width = "" + (split_left_px-1)  + "px";
	menu_bar.style.left = "" + (split_left_px-1)  + "px";
	
	var right_left = "" + (split_left_px + 2) + "px";
	tabs_wnd.style.left = right_left;
	view_wnd.style.left = right_left;
	gadg_wnd.style.left = right_left;
	tabs_bar.style.left = right_left;
	gadg_bar.style.left = right_left;
	
	var right_width = "" + (new_client_width-(split_left_px + 2)) + "px";
	tabs_wnd.style.width = right_width;
	view_wnd.style.width = right_width;
	gadg_wnd.style.width = right_width;
	tabs_bar.style.width = right_width;
	gadg_bar.style.width = right_width;
	
	tabs_wnd.style.height = "" + (split_right_top_px-1) + "px";
	tabs_bar.style.top = "" + (split_right_top_px-1) + "px";
	view_wnd.style.top = "" + (split_right_top_px+2) + "px";
	view_wnd.style.height = "" + (split_right_bottom_px-split_right_top_px) + "px";
	
	gadg_bar.style.top = "" + (split_right_bottom_px-1) + "px";
	gadg_wnd.style.top = "" + (split_right_bottom_px+2) + "px";
	gadg_wnd.style.height = "" + (new_client_height-(split_right_bottom_px+2)) + "px";
}

function update_menu_right(middle_x)
{
	var client_width = document.body.clientWidth;
	var left_width = middle_x - 1;
	var right_left = middle_x + 2;
	var right_width = client_width - right_left;
	
	menu_wnd.style.width = "" + left_width + "px";
	menu_bar.style.left = "" + left_width + "px";
	
	tabs_wnd.style.left = "" + right_left + "px";
	view_wnd.style.left = "" + right_left + "px";
	gadg_wnd.style.left = "" + right_left + "px";
	tabs_bar.style.left = "" + right_left + "px";
	gadg_bar.style.left = "" + right_left + "px";

	tabs_wnd.style.width = "" + right_width + "px";
	view_wnd.style.width = "" + right_width + "px";
	gadg_wnd.style.width = "" + right_width + "px";
	tabs_bar.style.width = "" + right_width + "px";
	gadg_bar.style.width = "" + right_width + "px";
}
 	
function update_tabs_bottom(middle_y)
{
	var client_height = parseInt(gadg_bar.style.top);
	var top_height = middle_y - 1;
	var bottom_top = middle_y + 2;
	var bottom_height = client_height - bottom_top;
	
	tabs_wnd.style.height = "" + top_height + "px";
	tabs_bar.style.top    = "" + top_height + "px";
	
	view_wnd.style.top    = "" + bottom_top + "px";
	view_wnd.style.height = "" + bottom_height + "px";
}
	
function update_gadgets_top(middle_y)
{
	var view_top = parseInt(view_wnd.style.top);
	var view_height = parseInt(view_wnd.style.height);
	var gadg_top = parseInt(gadg_wnd.style.top);
	var gadg_height = parseInt(gadg_wnd.style.height);
	var bottom_line = gadg_top+gadg_height;
	
	var top_height = middle_y - 1;
	var bottom_top = middle_y + 2;
	
	gadg_bar.style.top    = "" + top_height + "px";
	view_wnd.style.height = "" + (top_height-view_top) + "px";
	gadg_wnd.style.top    = "" + bottom_top + "px";
	gadg_wnd.style.height = "" + (bottom_line-bottom_top) + "px";
}
	
var mouseTarget = false;	
function mouseHandle(act,eve,tgt) {
	if (act == 1) {
		mouseTarget = tgt;
	}
	else
	if (act == 2) {
		mouseTarget = null;
	}
	else
	if (act == 3) {
		if (mouseTarget)
		{
			liquid_lazy_init();
			if (mouseTarget == menu_bar)
				update_menu_right(eve.clientX);
			else
			if (mouseTarget == tabs_bar)
				update_tabs_bottom(eve.clientY);
			else
			if (mouseTarget == gadg_bar)
				update_gadgets_top(eve.clientY);
			return false;
		}
	}
}

function mouseEvent(act,eve) {
  if (eve.srcElement) {//IE
    mouseHandle(act,eve,eve.srcElement);
  }
  else
  if (eve.which && eve.target) {//Mozilla
    mouseHandle(act,eve,eve.target);
  }
}

