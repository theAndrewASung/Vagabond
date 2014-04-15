//main.js

var main = angular.module("main",['ngRoute','controllers']);

main.config(function($routeProvider){
 $routeProvider.
  when("/home",{
   templateURL:"/partials/home.html",
   controller:"homeCtrl"
  }).
  otherwise({
   redirectTo:"/home"
  });
 });
