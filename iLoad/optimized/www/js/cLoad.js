var gettingImg = false;
		
function getImg(data){
	var req = new XMLHttpRequest();
	req.open("POST", "/loadImg", true);
	req.setRequestHeader("Content-type", "application/json");
				
	req.onreadystatechange = function () {
		if (req.readyState === 4 && req.status === 200) {
			var el = document.getElementById(data["id"]);
			var cSrc = "data:image/png;base64,"+req.responseText;
						
			console.log(req.responseText);
			el.src = cSrc;
						
			gettingImg = false;
		}
	}
	
	req.send(JSON.stringify(data));
	gettingImg = true;
}

var cLoad = {
	loadImages: function(){
		var allImgs = document.getElementsByTagName("img");
		var cLoadImgs = [];
		
		for(var i = 0; i<allImgs.length;i++){
			if(allImgs[i].hasAttribute("cLoad")){
				cLoadImgs.push(allImgs[i]);
			}
		}
		
		var i = 0;
		
		var interv = setInterval(function(){
			if(!gettingImg){	
				var imgSrc = cLoadImgs[i].getAttribute("cSrc");
				var imgId = cLoadImgs[i].id;
					
				i++;
				getImg({"id":imgId, "src":imgSrc});
			}
			
			if(i==cLoadImgs.length){
				clearInterval(interv);
			}
		}, 50);
	}
};