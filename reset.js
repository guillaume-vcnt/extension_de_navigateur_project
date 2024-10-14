function resetValue() {	
	window.location.reload();
	chrome.storage.local.clear(function() {
		const error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
	});
	chrome.storage.sync.clear(); 
console.log("🐳 reset values are:", settings);	
};

buttonReset.addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: resetValue,
		});
	});
});