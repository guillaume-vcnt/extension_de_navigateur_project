document.addEventListener("DOMContentLoaded", function() {
   const selectorRemover = document.getElementById("remover");
   const selectorFont = document.getElementById("font");
   const selectorFontsize = document.getElementById("font-size");
   const selectorLineheight = document.getElementById("line-height");
   const selectorSpacing = document.getElementById("letter-spacing");


   chrome.storage.local.get(["selectedRemover"], function(result) {
      if (result.selectedRemover) {
         selectorRemover.value = result.selectedRemover;
      }  
   });

   chrome.storage.local.get(["selectedFont"], function(result) {
      if (result.selectedFont) {
         selectorFont.value = result.selectedFont;
      }  
   });

   chrome.storage.local.get(["selectedFontsize"], function(result) {
      if (result.selectedFontsize) {
            selectorFontsize.value = result.selectedFontsize;
      }
   });

   chrome.storage.local.get(["selectedLineheight"], function(result) {
      if (result.selectedLineheight) {
            selectorLineheight.value = result.selectedLineheight;
      }
   });

   chrome.storage.local.get(["selectedSpacing"], function(result) {
      if (result.selectedSpacing) {
            selectorSpacing.value = result.selectedSpacing;
      }
   });


   selectorRemover.addEventListener("change", function() {
      const selectedRemover = selectorRemover.value;
      chrome.storage.local.set({ selectedRemover: selectedRemover});
   });

   selectorFont.addEventListener("change", function() {
      const selectedFont = selectorFont.value;
      chrome.storage.local.set({ selectedFont: selectedFont});
   });

   selectorFontsize.addEventListener("change", function() {
      const selectedFontsize = selectorFontsize.value;
      chrome.storage.local.set({ selectedFontsize: selectedFontsize});
   });

   selectorLineheight .addEventListener("change", function() {
      const selectedLineheight  = selectorLineheight.value;
      chrome.storage.local.set({ selectedLineheight: selectedLineheight});
   });

   selectorSpacing.addEventListener("change", function() {
      const selectedSpacing = selectorSpacing.value;
      chrome.storage.local.set({ selectedSpacing: selectedSpacing});
   });

});