!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");function n(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}function a(){t.toggleAttribute("disabled"),e.toggleAttribute("disabled")}e.setAttribute("disabled",""),t.addEventListener("click",(function(){a(),n(),intervalEl=setInterval(n,1e3)})),e.addEventListener("click",(function(){clearInterval(intervalEl),a()}))}();
//# sourceMappingURL=01-color-switcher.695e7896.js.map
