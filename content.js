const buttonRemover = document.querySelector("#remover");
const buttonFont = document.querySelector("#font");
const buttonFontSize = document.querySelector("#font-size");
const buttonLineHeight = document.querySelector("#line-height");
const buttonLetterSpacing = document.querySelector("#letter-spacing");
const buttonReset = document.querySelector("#reset");

let settings = {
	buttonFont: {
		styleProperty: "fontFamily",
		defaultValue: null,
		customValue: null,
	},
	buttonFontSize: {
		styleProperty: "fontSize",
		defaultValue: null,
		customValue: null,
	},
	buttonLineHeight: {
		styleProperty: "lineHeight",
		defaultValue: null,
		customValue: null,
	},
	buttonLetterSpacing: {
		styleProperty: "letterSpacing",
		defaultValue: null,
		customValue: null,
	},
	buttonRemover: {
		status: false,
	},
};


console.log("🐍 initial settings object is:", settings);

// ------------ FONCTIONS POUR CUSTOMISER LA PAGE ------------ //

function changeFont(font) {
	const link = document.createElement('link'); 
	link.setAttribute("rel","stylesheet");
	document.head.appendChild(link);

	const allTags = document.querySelectorAll("*");
	console.log("Je suis dans change font");
	console.log("font value is:", font);

	const style = document.createElement("style");

	if (font === "Roboto") {
		link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
		allTags.forEach((tag) => {
			tag.style.fontFamily = "Roboto";
			settings.buttonFont.customValue = window
				.getComputedStyle(tag, null)
				.getPropertyValue("font-family");
		});
		
	} else if (font === "Signika") {
		link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap");
		allTags.forEach((tag) => {
			tag.style.fontFamily = "Signika";
			settings.buttonFont.customValue = window
				.getComputedStyle(tag, null)
				.getPropertyValue("font-family");
		});

	} else if (font === "OpenDyslexic") {
		style.innerHTML = 
		`@font-face {
			font-family: "OpenDyslexic";
			src: url('${chrome.runtime.getURL('fonts/open_dyslexic/OpenDyslexic-Bold.otf')}') format("opentype"),
			url('${chrome.runtime.getURL('fonts/open_dyslexic/OpenDyslexic-BoldItalic.otf')}') format("opentype"),
			url('${chrome.runtime.getURL('fonts/open_dyslexic/OpenDyslexic-Italic.otf')}') format("opentype"),
			url('${chrome.runtime.getURL('fonts/open_dyslexic/OpenDyslexic-Regular.otf')}') format("opentype"),
		
		body, * {
			font-family: 'OpenDyslexic';
		}`
		console.log("🐖 style is:", style);
		;
		document.head.appendChild(style);
		allTags.forEach((tag) => {
			tag.style.fontFamily = "OpenDyslexic";
			settings.buttonFont.customValue = window
				.getComputedStyle(tag, null)
				.getPropertyValue("font-family");
		});

	} else if (font === "Lexia") {
		style.innerHTML = 
		`@font-face {
			font-family: "Lexia";
			src: url('${chrome.runtime.getURL('fonts/lexia_readable/LexieReadable-Bold.ttf')}') format("truetype"),
			url('${chrome.runtime.getURL('fonts/lexia_readable/LexieReadable-Regular.ttf')}') format("truetype"),
		
		body, * {
			font-family: 'Lexia';
		}`
		console.log("🐖 style is:", style);
		;
		document.head.appendChild(style);
		allTags.forEach((tag) => {
			tag.style.fontFamily = "Lexia";
			settings.buttonFont.customValue = window
				.getComputedStyle(tag, null)
				.getPropertyValue("font-family");
		});
		
	} else if (font === "default") {
		allTags.forEach((tag) => {
			tag.style.fontFamily = settings.buttonFont.defaultValue;
			settings.buttonFont.customValue = window
				.getComputedStyle(tag, null)
				.getPropertyValue("font-family");
		});
	}
}

function changeFontSize(sliderValue) {
	const allTags = document.querySelectorAll("*");
	const defaultValue = settings.buttonFontSize.defaultValue;

	allTags.forEach((tag) => {
		let newFontSize =
			(sliderValue * parseFloat(defaultValue)) / 100 + parseFloat(defaultValue);
		tag.style.fontSize = newFontSize + "px";
		tag.style.lineHeight = "1.5em";
		tag.style.boxSizing = "border-box";
		tag.style.overflowWrap = "break-word";
		tag.style.hyphens = "auto";
		settings.buttonFontSize.customValue = window
			.getComputedStyle(tag, null)
			.getPropertyValue("font-size");
	});
	console.log("🐣 update font-size is:", settings);
}

function changeLineHeight(sliderValue) { 
	const allTags = document.querySelectorAll("*");
	const defaultValue = settings.buttonLineHeight.defaultValue;
	allTags.forEach((tag) => {
		let newLineHeight =
			(sliderValue * parseFloat(defaultValue)) / 100 + parseFloat(defaultValue);
		tag.style.lineHeight = newLineHeight + "px";
		// console.log("new value is:", newLineHeight);
		// console.log("slider value is:", sliderValue);
		// console.log("default value is:", defaultValue);
		settings.buttonLineHeight.customValue = window
			.getComputedStyle(tag, null)
			.getPropertyValue("line-height");
	});
	console.log("🐸 update line-height is:", settings);
}

function changeLetterSpacing(letterSpacing) {
	const allTags = document.querySelectorAll("*");
	allTags.forEach((tag) => {
		tag.style.letterSpacing = letterSpacing + "px";
		settings.buttonLetterSpacing.customValue = window
			.getComputedStyle(tag, null)
			.getPropertyValue("letter-spacing");
	});
	console.log("🐙 update letter-spacing is:", settings);
}


// ------------ GESTION DES BOUTONS ------------ //

buttonFont.addEventListener("change", () => {
	let fontValue = document.getElementById("font").value;
	console.log("font value is:", fontValue);
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: changeFont,
			args: [fontValue],
		});
	});
});

buttonFontSize.addEventListener("input", (event) => {
	let sliderValue = event.target.value;
	// let defaultValue = settings.buttonFontSize.defaultValue;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: changeFontSize,
			args: [sliderValue],
		});
	});
});

buttonLineHeight.addEventListener("input", (event) => {
	let sliderValue = event.target.value;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: changeLineHeight,
			args: [sliderValue],
		});
	});
});

buttonLetterSpacing.addEventListener("input", (event) => {
	let letterSpacing = event.target.value;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: changeLetterSpacing,
			args: [letterSpacing],
		});
	});
});

buttonReset.addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: resetSettings,
			// args: [x],
		});
	});
});