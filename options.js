// Saves options to chrome.storage
function save_options() {
  var country = document.getElementById('country').value;
  var youremail = document.getElementById('youremail').value;
  document.getElementById('c_country').innerHTML = country;
  console.log(country);
  chrome.runtime.sendMessage({message: country});
  
  	if(country == "Vietnam") {
		
		chrome.browserAction.setBadgeText({text: "VN"}); 
				
	}else if (country == "Thailand") {
		
		chrome.browserAction.setBadgeText({text: 'TH' });
		
		
	}else if (country == "China") {
		
		chrome.browserAction.setBadgeText({text: 'CN' });
		
	
	}else if (country == "Japan") {
		
		chrome.browserAction.setBadgeText({text: 'JP' });
		
	}else if (country == "Korea") {
		
		chrome.browserAction.setBadgeText({text: 'KR' });
		
	}else if (country == "Indonesia") {
		
		chrome.browserAction.setBadgeText({text: 'ID' });
		
	}else if (country == "Other") {
		
		chrome.browserAction.setBadgeText({text: 'CB' });
		
	}

    


  chrome.storage.sync.set({
    mycountry: country, ouremail: youremail
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved, refresh your SF' ;
	setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}





function inject_options() {
  var myGTM = document.getElementById('yourGTM').value;
  console.log("my GTM injector ID is " + myGTM);
  chrome.runtime.sendMessage({message: myGTM});
  
  

  chrome.storage.sync.set({
    myInjector: myGTM, gtmToDo: 'start'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'GTM injected, refresh your browser' ;
	setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function stop_injector() {
  var myGTM = document.getElementById('yourGTM').value;
  console.log("my GTM injector ID is " + myGTM);
  chrome.runtime.sendMessage({message: myGTM});
  
  

  chrome.storage.sync.set({
    gtmToDo: 'stop'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'GTM injector stopped, refresh your browser' ;
	setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
	
	var y = "";

  chrome.storage.sync.get({mycountry: 'Thailand',ouremail: 'xxx@google.com', myInjector: 'gtm-xxx',gtmToDo: 'notStart'}, function(items) {
	console.log('why not here ' + items.myInjector + ' ' +items.gtmToDo);
    document.getElementById('country').value = items.mycountry;
	document.getElementById('youremail').value = items.ouremail;
	document.getElementById('yourGTM').value = items.myInjector;
	console.log(items.ouremail);
	y = items.mycountry;
	window.superx = y;
	console.log(superx);
    document.getElementById('c_country').innerHTML = superx;
	chrome.runtime.sendMessage({message: country});
	});
	}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
$('#startGTM').click(inject_options);	
$('#stopGTM').click(stop_injector);	
	
	



