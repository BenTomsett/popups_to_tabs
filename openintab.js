chrome.windows.getCurrent({},function(window){
	//Get the ID of the window
	let main = window.id;

	//When a new window is created..
	chrome.windows.onCreated.addListener(function(newWindow){

		//..if it is a popup..
		if(newWindow.type === "popup"){

			chrome.windows.get(newWindow.id,{populate:true},function(window){

				//..move it to a tab instead
				chrome.tabs.query({
					active: true,
					windowId: window.id
				}, function (tabs) {
					chrome.tabs.move(window.tabs[0].id,{windowId:main,index:-1},function(){
						chrome.tabs.update(window.tabs[0].id,{active:true});
					});
				});

			});
		}
	});

	//focus on the new tab
	chrome.windows.onFocusChanged.addListener(function(w){
		chrome.windows.get(w,{},function(w){
			if(w.type === "normal"){
				main = w.id;
			}
		});
	});
});