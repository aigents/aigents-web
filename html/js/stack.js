function stackSetClassAttribute(obj,className)
{
	obj.setAttribute("class",className);//Mozilla
	obj.setAttribute("className",className);//IE
	obj.className = className;
}

function stackSelectRowHandlerDefault(rowIndex)
{
	//alert("row="+rowIndex);
}

function stackClickRowHandler() {
	if (stackFilledRows && this.rowIndex < stackFilledRows)
	{
		stackBody.focus();
		stackSelectedRow = this.rowIndex;
		tbl = this.parentNode;
		stackColor(tbl);
		stackSelectRowHandler(stackSelectedRow);
	}
}

function stackActivateRowDefault(row) {
	alert(row.getAttribute("rowId")+":"+row.rowIndex);
}

function stackDblClickRowHandler() {
	if (stackFilledRows && this.rowIndex < stackFilledRows)
	{
		stackSelectedRow = this.rowIndex;
		tbl = this.parentNode;
		stackColor(tbl);
		stackActivateRowHandler(this);    
	}
}

function stackHoverRowHandler() {
    row = this;
    tbl = row.parentNode;
	stackColor(tbl);
	if (stackFilledRows && this.rowIndex < stackFilledRows)
		stackSetClassAttribute(row, "stackhigh");
}

function stackOutRowHandler() {
	stackColor(tbl);
}

//http://codingforums.com/showthread.php?t=52931	
//http://www.webmasterworld.com/forum91/5025.htm
function stackSetUpBodyRow(row,number) {
	stackSetClassAttribute(row,"stackrow");
	row.onclick = stackClickRowHandler;
	row.onmousemove = stackHoverRowHandler;
	row.onmouseout = stackOutRowHandler;
	row.ondblclick = stackDblClickRowHandler;
	row.setAttribute("rowId",number);
}

function stackSetUpHeadRow(row,number) {
	stackSetClassAttribute(row,"stackheadrow");
}

function stackColor(tbl) {
    for (i = 0; i < tbl.rows.length; i++) {
        stackSetClassAttribute(tbl.rows[i], stackSelectedRow == tbl.rows[i].rowIndex ? "stacksel" : "stackrow");
    }
}

var debug_x = false;
function debug(x) {
	if (!debug_x) {
		debug_x = true;
		alert(x);
	}
}

function setCellStyle(cell,width,align) {
	cell.style.overflow="hidden";
	cell.style.clip="rect(0,0,1em,5em)";
	cell.style.clip="rect(0,0,1em,5em)";
	cell.style.width = "".concat(width,"em");
	cell.style.height = "1em";
	cell.style.textAlign = align ? "left" : "right";
}

function setRowStyle(row) {
	row.style.height = "2em";
}

function stackInsertRow(stack, row, widths, height, aligns, isHeader) {
    stack.insertRow(row);
    if (isHeader)
		stackSetUpHeadRow(stack.rows[row], row);
	else
		stackSetUpBodyRow(stack.rows[row], row);
    for (c=0;c<widths.length;c++) {
		stack.rows[row].insertCell(c);
		var div = stackDoc.createElement('div');
		setCellStyle(div,widths[c],aligns[c]);
		if (isHeader)
		{
			stack.rows[row].cells[c].style.verticalAlign = "top";
			div.style.height = (height*1.25).toString()+"em";
		}
		stack.rows[row].cells[c].appendChild(div);
    }
}

function stackSetRowText(stack, row, cols) {
    for (c=0;c<cols.length && c<stack.rows[row].cells.length;c++) {
		if (cols[c].indexOf('@') == -1)
			stack.rows[row].cells[c].childNodes[0].innerHTML = cols[c];
		else
		{
			link = stackDoc.createElement('a');
			link.innerHTML = cols[c];
			link.href = "mailto:"+cols[c];
			stack.rows[row].cells[c].childNodes[0].appendChild(link);
		}
    }
}

function stackKeyHandlerDefault(id)
{
	lastRow = stackFilledRows - 1;
	// 38up 40dn 33pgup 34pgdn
	if (id==38) {//up
		if (stackSelectedRow > 0)
			stackSelectedRow--; 
	}
	else
    if (id==40) {//dn
		if (stackSelectedRow < lastRow)
			stackSelectedRow++;
	}
	else
	if (id==33) {//pgup
		stackSelectedRow = 0;
	}
	else 
	if (id==34) {//pgdn
		stackSelectedRow = lastRow;
	}
	else
		return false;
	return true;
}

function stackKey(id,target)
{
	if (stackKeyHandler(id)) {
		stackColor(target);
		return false; // no default action needed
	}
	else
	if (id == 13) {//Enter
		stackActivateRowHandler(target.rows[stackSelectedRow]);
		return false; // no default action needed
	}
	else
	if (id == 27) 
	{ 
		//TODO
	}
	return true; // need default action
}

function stackKeyUp(eve) 
{
  if (eve.keyCode && eve.srcElement)//IE
  {
	stack = eve.srcElement;
	while (!stack.rows && stack.parentNode)
		stack = stack.parentNode;	
    return stackKey(eve.keyCode,stack);
  }
  else
  if (eve.which && eve.target)//Mozilla
  {
    return stackKey(eve.which,eve.target);
  }
}

function stackInit(doc,head_id,body_id,heads,widths,aligns,headRows,totalRows,activateHandler,keyHandler,selectRowHandler)
{
	stackDoc = doc;
    stackHead = stackDoc.getElementById(head_id);
    stackBody = stackDoc.getElementById(body_id);
	stackHead.setAttribute("class","stackhead");
	stackInsertRow(stackHead, 0, widths, headRows, aligns, true);
	stackSetRowText(stackHead, 0, heads);
	stackBody.setAttribute("class","stackbody");
	for (var r=0;r<totalRows;r++) {
	    stackInsertRow(stackBody, r, widths, 1, aligns, false);
	}
	stackActivateRowHandler = activateHandler ? activateHandler : stackActivateRowDefault;
	stackKeyHandler = keyHandler ? keyHandler : stackKeyHandlerDefault;
	stackSelectRowHandler = selectRowHandler ? selectRowHandler : stackSelectRowHandlerDefault;
	stackSelectedRow = -1;
}

function stackFill(rows,selectedRow)
{
    stackSelectedRow = selectedRow; 
    stackFilledRows = rows.length;
	for (var r=0;r<rows.length;r++) {
	    stackSetRowText(stackBody, r, rows[r]);
	}
	for (;r<stackBody.rows.length;r++) {
		for (var c = 0; c < stackBody.rows[r].cells.length; c++) {
			stackBody.rows[r].cells[c].childNodes[0].innerHTML = "";
		}
	}
	stackColor(stackBody);
}

function measureBrowserSettings(doc,cls)
{
	if (top.browserSettingsSet != true)
	{
		top.browserIE = navigator.appName.indexOf("Microsoft") != -1;
		var div = doc.createElement('div');
		stackSetClassAttribute(div,cls);
		div.style.visibility = "hidden";
		div.style.width = "10em";
		div.style.height = "10em";
		doc.body.appendChild(div);
		top.browserTextWidth = div.offsetWidth / 10;
		top.browserTextHeight = div.offsetHeight / 10;
		doc.body.removeChild(div);
		top.browserSettingsSet = true;
		//alert("IE="+top.browserIE+","+top.browserTextWidth+":"+top.browserTextHeight);
		//requestServer("&type=4&code="+id+"&val="+val+"&key="+key+"&new_id="+new_id+"&",new_id);
		return true;
	}
	return false;
}

