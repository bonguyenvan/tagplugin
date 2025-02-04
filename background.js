// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
	var CONTEXT_MENU_CONTENTS = {
		forSelection: ["SFsearch", "AdwordsSearch", "SF console"]
	};

	CONTEXT_MENU_CONTENTS.forSelection.forEach(function (commandId) {
		chrome.contextMenus.create({
			title: 'Open "%s" in ' + commandId,
			id: commandId,
			contexts: ["selection"]
		});
	});
});

chrome.contextMenus.onClicked.addListener(function (itemData) {
	if (itemData.menuItemId == "SFsearch") {
		console.log("infomenuitem match");
		chrome.tabs.create(
			{
				url:
					"https://smbsalesimplementation.my.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&sen=0F9&sen=a04&sen=a0s&sen=a1W&sen=a0X&sen=a0z&sen=a09&sen=00O&sen=001&sen=003&sen=a0D&sen=500&sen=005&sen=a0l&str=" +
					itemData.selectionText
			},
			function (tab) {
				chrome.tabs.update(tab.id, { active: true }, function () { });
				// Tab opened.
			}
		);
	}
	if (itemData.menuItemId == "AdwordsSearch") {
		document.execCommand("copy", false, null);

		console.log("infomenuitem match");
		chrome.tabs.create(
			{
				url:
					"https://adwords.corp.google.com/aw/go?external_cid=" +
					itemData.selectionText
			},
			function (tab) {
				var createdtab = tab.id;

				// Tab opened.
				chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
					chrome.tabs.update(tab.id, { active: false }, function () { });
					/* 			if(createdtab == tabId && tab.status == 'complete'){console.log(tabId, tab);
							  chrome.tabs.executeScript(createdtab, { 
					  code: 'alert("'+'hello'+'")'
				  });
		  
				  	
				  	
					  } */
				});
			}
		);
	}
	if (itemData.menuItemId == "SF console") {
		console.log("infomenuitem match");
		var tabId;
		chrome.tabs.query(
		  { url: "https://smbsalesimplementation.my.salesforce.com/console*" },
		  function(results) {
			if (results.length == 0) {
			  chrome.tabs.create(
				{ url: "https://smbsalesimplementation.my.salesforce.com/console" },
				function(tab) {
				  console.log("me console tab");
				  var stext = itemData.selectionText;
	
				  chrome.storage.sync.set(
					{ mytext: itemData.selectionText },
					function() {}
				  );
				}
			  );
			  setTimeout(function(){ 
			chrome.tabs.executeScript(null, { file: "jquery.js"});
			chrome.tabs.executeScript(null, {file:"searchconsole.js" });
			}, 5000);
			} else {
			  tabId = results[0].id;
			  chrome.windows.update(results[0].windowId, {focused: true},function(){
				chrome.tabs.update(tabId, { selected: true }, function() {
				  console.log("mehere");
	  
				  chrome.storage.sync.set(
					{ mytext: itemData.selectionText },
					function() { console.log(itemData.selectionText);}
				  );
				  chrome.tabs.executeScript(null, { file: "jquery.js"});
				  chrome.tabs.executeScript(null, {file:"searchconsole.js" });
				});
			  });
			  
			}
		  }
		);
	  }

});

chrome.storage.sync.get(
	{ mycountry: "thailand", ouremail: "xxx@google.com" },
	function (result) {
		console.log("Value currently is " + result.mycountry);

		if (result.mycountry == "Vietnam") {
			openService(result.mycountry);
			chrome.browserAction.setBadgeText({ text: "VN" });
		} else if (result.mycountry == "Thailand") {
			chrome.browserAction.setBadgeText({ text: "TH" });
		} else if (result.mycountry == "China") {
			openService(result.mycountry);
			chrome.browserAction.setBadgeText({ text: "CN" });
		} else if (result.mycountry == "Japan") {
			openService(result.mycountry);
			chrome.browserAction.setBadgeText({ text: "JP" });
		} else if (result.mycountry == "Korea") {
			openService(result.mycountry);
			chrome.browserAction.setBadgeText({ text: "KR" });
		} else if (result.mycountry == "Indonesia") {
			openService(result.mycountry);
			chrome.browserAction.setBadgeText({ text: "ID" });
		}
	}
);

console.log("I'm here");
chrome.runtime.onMessage.addListener(function (textme, sender, sendResponse) {
	console.log(textme.textyou);
	//15 mins warning
	if (textme.textyou == "15min") {
		console.log("15min");
		var opt = {
			type: "basic",
			title: "Get Ready!",
			message: "You have less than 15 mins!",
			contextMessage: "click this to go to salesforce now",
			iconUrl: "https://screenshot.googleplex.com/yaPAh5U0920.png"
		};
	}

	if (textme.textyou == "10min") {
		console.log("gotit");
		var opt = {
			type: "basic",
			title: "Almost there! Dont miss it",
			message: "You have less than 10 mins!",
			contextMessage: "click this to go to salesforce now",
			iconUrl: "https://screenshot.googleplex.com/voy4NRVLQGN.png"
		};
	}

	if (textme.textyou == "5min") {
		console.log("gotit");
		var opt = {
			type: "basic",
			title: "STATUS ON CALL NOW!",
			message: "You have less than 5 mins!",
			contextMessage: "click this to go to salesforce now",
			requireInteraction: true,
			iconUrl: "https://screenshot.googleplex.com/Y1hrPgKf2LN.png"
		};
	}
});

function openService(theCountry) {
console.log(theCountry);	
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status != 'complete')
        return;
    if (tab.url.indexOf('https://smbsalesimplementation.my.salesforce.com/console') != -1) {
        			  
			var openTab=(href,cb=null)=>{
				console.log(href);
				var param={url:href};
			
				chrome.tabs.query(param,tabs=>{
				param.active=false;
					function cb(newID) {
						console.log(newID)
						chrome.tabs.move(newID.id, {index: 0})	
					}
				(tabs.length==0)?chrome.tabs.create(param,cb):console.log('already have tab');
		
			
				});
			
			}
			openTab('https://smbsalesimplementation.my.salesforce.com/a0l?fcf=00B3x00000AZxH6');
    }
});
	
	
}


/*
//getting JSON DATA

//var xhr = new XMLHttpRequest();
var newObj 
//xhr.onload = function() {
//    var json = xhr.responseText;                         // Response
//    json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
//    json = JSON.parse(json);                             // Parse JSON
//    // ... enjoy your parsed json...
//};
// Example:
//data = 'Example: appended to the query string..';
//xhr.open('GET', 'http://www.tagteam-tdcx.com/chareef/wp-content/uploads/customjs/ipcases.json');
//xhr.send(); 
 
jQuery.ajax({
    url: "http://www.tagteam-tdcx.com/chareef/wp-content/uploads/customjs/ipcases.json",
    type: 'GET',
    cache: false,
    success: function(result) {
        //  alert(jQuery.dataType);
        if (result) {
           newObj = result;
           for(var i=0;i<newObj.length;i++){
            if(newObj[i].caseOwner === "Akihiko Ibuki")
               console.log(newObj[i].caseNumber)
          }
        }

    },
    error: function() {
        alert("No");
    }
});  



*/


//script for Reply function in chat google.
// 1. = 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
	let key, value;
	
	switch (message.method){
	case 'fe2bg_realtime':
		const data = {
			value: "fe2bg_realtime"
		};
		
		sendResponse(data);
		break;

	case 'fe2bg_chromestorage_set':
		key = message.key;
		value = message.value;
		let key_value = {};
		key_value[key] = value;
		chrome.storage.local.set(key_value, function() {
			sendResponse(value);
		});
		break;
		
	case 'fe2bg_chromestorage_get':
		key = message.key;
		chrome.storage.local.get(key, function(result) {
			sendResponse({value: result[key]});
		});
		break;
		
	case 'fe2bg_chromestorage_remove':
		key = message.key;
		chrome.storage.local.remove(key, function(result) {
			sendResponse({rs: true});
		});
		break;
	}
	return true;
});
