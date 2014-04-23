//main.js

var main = angular.module("main",['ngRoute','controllers']);

main.config(function($routeProvider){
 $routeProvider.
  when("/home",{
   controller:"homeCtrl",
   template:"YAAY, Home Content"
  }).
  when("/issues",{
   controller:"issuesCtrl",
   template:"YAAY, Issues Content"
  }).
  when("/staff",{
   controller:"staffCtrl",
   template:"YAAY, Staff Content"
  }).
  when("/submissions",{
   controller:"subCtrl",
   template:"YAAY, Submissions Content"
  }).
  when("/faq",{
   controller:"faqCtrl",
   template:"YAAY, FAQ Content"
  }).
  otherwise({
   redirectTo:"/home"
  });
 });
