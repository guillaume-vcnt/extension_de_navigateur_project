// ------------ FONCTIONS POUR RECUPERER LES VALEURS PAR DEFAUT ------------ // 

function getDefaultValue() {
	const allTags = document.querySelectorAll("*");
    if (!settings.buttonFont.defaultValue) {
        allTags.forEach((tag) => {
            settings.buttonFont.defaultValue = window.getComputedStyle(tag, null).getPropertyValue("font-family");
            settings.buttonFontSize.defaultValue = window.getComputedStyle(tag, null).getPropertyValue("font-size");
            settings.buttonLineHeight.defaultValue = window.getComputedStyle(tag, null).getPropertyValue("line-height");
            settings.buttonLetterSpacing.defaultValue = window.getComputedStyle(tag, null).getPropertyValue("letter-spacing");
        });
    };
};

document.addEventListener("DOMContentLoaded", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: getDefaultValue,
		});
	});
})

