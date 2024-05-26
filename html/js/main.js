   // this is special to radio buttons
   function radioClickById(name,id,value)  {
      var el = document.getElementById(id);
      el.value = value;
      //alert("value="+value+" type="+el.type+" name="+el.name+" el.value="+el.value);
      top.onValChange(name,value)
   }
   function radioFocusById(id)  {
      var el = document.getElementById(id);
      top.onFocus(el);
   }

   //20060817
   function onCalFocus(cal) {
     //top.debug('onCalFocus in: name='+cal.name+' opt='+cal.options[0].text+' idx='+cal.selectedIndex+' val='+cal.value);
     top.onFocus(cal);
     top.onValChange(cal.name,cal.options[0].text);
     if(cal.clickedCal==true)	
       top.onKey(13,cal);
     if (top.ie())//1039,Anton20070614
       return false;
   }
   //20060817
   function onCalClick(cal,cal_id,anc_id)  
   {
     cal.clickedCal = true;//1039,Anton20070614
     //top.debug('onCalClick in: name='+cal.name+' opt='+cal.options[0].text+' idx='+cal.selectedIndex+' val='+cal.value);
     cal19.select(cal,anc_id,'dd/MM/yyyy',cal.value!="" ? cal.value : cal.options[0].text);//20080921
   }

   // needed for webview only, when no top frame exists
   var ie_determined = false;
   var ie_indicator;
   function ie()
   {
     if (!ie_determined)
     {
       ie_indicator = navigator.appName.indexOf("Microsoft") != -1;
       ie_determined = true;
    }
    return ie_indicator;
   }
   function move(e)
   {
   }
   function load(w,i)
   {
   }
	
