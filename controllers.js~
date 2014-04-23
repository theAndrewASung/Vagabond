//controllers.js

var ctrl = angular.module('controllers',[]);

ctrl.controller("headerCtrl",function($scope,$route){
  $scope.menu = [{page:'home',route:'/home',bgimg:'lonely'},
                 {page:'issues',route:'/issues',bgimg:'issues'},
                 {page:'staff',route:'/staff',bgimg:'sunset'},
                 {page:'submissions',route:'/submissions',bgimg:'submissions'},
                 {page:'FAQ',route:'/faq',bgimg:'FAQ'}];
  
  $scope.previews = [{e: ["tears and goodbye",
               "and thus another from our world is swept to the next in a calmly passing tide\nthe world quakes beneath the tears we've wept, our solemn cries echo over the snow draped land\nall falls silent in this peaceful night - waves of the moonlit seas subside\nblinded by tears we try to find our sight, to search amongst the stars for where you now stand",
              "Finnish"],
           l: ["Kyyneleistä ja hyvästeistä",
               "niin taas yksi kuolevaisten piiristä toiseen katoaa\nkaikuu itku surevaisten, kantaa halki tyventen vesien\nkaikkialla vaietaan – ei meressä yhtä aaltoa\nkauniin yön kirkkaimmista tähdistä sinua etsien",
               "Lisää",
               "Suomi"],
           d: ["http://joom.ag/F60X/p6",
               "Karlong Chan",
               "Spring 2013",
               "plane"]
          }];
  $scope.page = 'home';
  $scope.$on("$routeChangeSuccess",updateHeader);
  function updateHeader(){
    $scope.page = $route.current.scope.page;
    $("#"+$scope.page).addClass('nextFrame').removeClass("deadFrame");
    if($scope.page=='home'){
      $("#home").css({backgroundImage:"none"});
      pushNextFrame(homePageOverride);
    }else{
      pushNextFrame();
    }
  }; 
  $scope.previews;
});

ctrl.controller("footerCtrl",function($scope){
  $scope.lastUpdated = "April 21, 2014";
});

ctrl.controller("homeCtrl",function($scope){
  $scope.page = 'home';
  
  $scope.news;
});

ctrl.controller("issuesCtrl",function($scope){
  $scope.page = 'issues';
});

ctrl.controller("subCtrl",function($scope){
  $scope.page = 'submissions';
});

ctrl.controller("staffCtrl",function($scope){
  $scope.page = 'staff';
});

ctrl.controller("faqCtrl",function($scope){
  $scope.page = 'FAQ';
});
