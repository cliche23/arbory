function x(f){return f&&f.__esModule&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f}var v={exports:{}};/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */(function(f,h){(function(d){var u;if(f.exports=d(),u=!0,!u){var l=window.Cookies,r=window.Cookies=d();r.noConflict=function(){return window.Cookies=l,r}}})(function(){function d(){for(var r=0,o={};r<arguments.length;r++){var s=arguments[r];for(var a in s)o[a]=s[a]}return o}function u(r){return r.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}function l(r){function o(){}function s(n,t,e){if(!(typeof document>"u")){e=d({path:"/"},o.defaults,e),typeof e.expires=="number"&&(e.expires=new Date(new Date*1+e.expires*864e5)),e.expires=e.expires?e.expires.toUTCString():"";try{var g=JSON.stringify(t);/^[\{\[]/.test(g)&&(t=g)}catch{}t=r.write?r.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var c="";for(var p in e)e[p]&&(c+="; "+p,e[p]!==!0&&(c+="="+e[p].split(";")[0]));return document.cookie=n+"="+t+c}}function a(n,t){if(!(typeof document>"u")){for(var e={},g=document.cookie?document.cookie.split("; "):[],c=0;c<g.length;c++){var p=g[c].split("="),i=p.slice(1).join("=");!t&&i.charAt(0)==='"'&&(i=i.slice(1,-1));try{var C=u(p[0]);if(i=(r.read||r)(i,C)||u(i),t)try{i=JSON.parse(i)}catch{}if(e[C]=i,n===C)break}catch{}}return n?e[n]:e}}return o.set=s,o.get=function(n){return a(n,!1)},o.getJSON=function(n){return a(n,!0)},o.remove=function(n,t){s(n,"",d(t,{expires:-1}))},o.defaults={},o.withConverter=l,o}return l(function(){})})})(v);var m=v.exports;const D=x(m);export{D as C};