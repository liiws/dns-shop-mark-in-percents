// ==UserScript==
// @name        dns-shop-mark-in-percents
// @namespace   https://www.dns-shop.ru/
// @include     https://www.dns-shop.ru/product/*/*/opinion/
// @grant       none
// @run-at      document-start
// @version     1.0.0
// @downloadURL https://bitbucket.org/liiws/dns-shop-mark-in-percents/downloads/dns-shop-mark-in-percents.user.js
// @updateURL   https://bitbucket.org/liiws/dns-shop-mark-in-percents/downloads/dns-shop-mark-in-percents.meta.js
// ==/UserScript==


window.addEventListener('DOMContentLoaded', Run);
window.addEventListener('load', Run);

function Run(isRepeating) {
	// if we called from 'DOMContentLoaded' then we don't need be called from 'onload'
	 window.removeEventListener('load', Run);

    if (isRepeating !== true) {
        setTimeout(Run, 2000, true);
        return;
    }

    var marksBlock = document.querySelector("div.ow-filters__rating");

    var mark5elem = marksBlock.querySelector('label') || {};
    var mark4elem = marksBlock.querySelector('label+label') || {};
    var mark3elem = marksBlock.querySelector('label+label+label') || {};
    var mark2elem = marksBlock.querySelector('label+label+label+label') || {};
    var mark1elem = marksBlock.querySelector('label+label+label+label+label') || {};

    var mark5val = +((mark5elem.innerText || '0').replaceAll(" ", "").match(/\d+/) || [])[0];
    var mark4val = +((mark4elem.innerText || '0').replaceAll(" ", "").match(/\d+/) || [])[0];
    var mark3val = +((mark3elem.innerText || '0').replaceAll(" ", "").match(/\d+/) || [])[0];
    var mark2val = +((mark2elem.innerText || '0').replaceAll(" ", "").match(/\d+/) || [])[0];
    var mark1val = +((mark1elem.innerText || '0').replaceAll(" ", "").match(/\d+/) || [])[0];

    var total = mark5val + mark4val + mark3val + mark2val + mark1val;

    document.querySelectorAll(".dns-mip").forEach(elem => elem.remove());

    mark5elem.querySelector('span').innerHTML += '<span class="dns-mip" style="color:red"> &nbsp; ' + (Math.round(mark5val/total*1000)/10) + '%</span>';
    mark4elem.querySelector('span').innerHTML += '<span class="dns-mip" style="color:red"> &nbsp; ' + (Math.round(mark4val/total*1000)/10) + '%</span>';
    mark3elem.querySelector('span').innerHTML += '<span class="dns-mip" style="color:red"> &nbsp; ' + (Math.round(mark3val/total*1000)/10) + '%</span>';
    mark2elem.querySelector('span').innerHTML += '<span class="dns-mip" style="color:red"> &nbsp; ' + (Math.round(mark2val/total*1000)/10) + '%</span>';
    mark1elem.querySelector('span').innerHTML += '<span class="dns-mip" style="color:red"> &nbsp; ' + (Math.round(mark1val/total*1000)/10) + '%</span>';
}
