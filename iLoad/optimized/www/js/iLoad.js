var gettingImg = false;
		
function getImg(data){
	var req = new XMLHttpRequest();
	req.open("POST", "/loadImg", true);
	req.setRequestHeader("Content-type", "application/json");
				
	req.onreadystatechange = function () {
		if (req.readyState === 4 && req.status === 200) {
			var el = document.getElementById(data["id"]);
			var cSrc = "data:image/png;base64,"+req.responseText;
						
			if(el.tagName=="IMG"){
				el.src = cSrc;
			}
			else{
				console.log("div");
				var divImg = el.getElementsByTagName("IMG")[0];
				
				el.style.backgroundImage = "url("+cSrc+")";
				divImg.src = cSrc;
			}
						
			gettingImg = false;
		}
	}
	
	req.send(JSON.stringify(data));
	gettingImg = true;
}

var iLoad = {
	loadImages: function(){
		var cLoadImgs = document.querySelectorAll("[iLoad]");
		
		var i = 0;
		
		var interv = setInterval(function(){
			if(!gettingImg){
				var el = cLoadImgs[i];
				if(el==undefined){
					clearInterval(interv);
					return;
				}
				var imgSrc = el.getAttribute("iSrc");
				var imgId = el.id;
				
				i++;
				getImg({"id":imgId, "src":imgSrc});
			}
			
			if(i==cLoadImgs.length){
				clearInterval(interv);
			}
		}, 50);
	}
};