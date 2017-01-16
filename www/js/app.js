// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MapController', function($scope, $ionicLoading,$cordovaGeolocation,$http) {
 $scope.gcodeDisplay = '';
    google.maps.event.addDomListener(window, 'load', function() {
		var options = {timeout: 10000, enableHighAccuracy: true};
 
		
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
		
       var mapOptions = {
			center: myLatlng,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
 
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		map.setCenter(new google.maps.LatLng(37.3000, -120.4833));
		var myLocation = new google.maps.Marker({
			position: new google.maps.LatLng(37.3000, -120.4833),
			map: map,
			title: "My Location"
		});
		 $scope.$watch('location',function(addr){
			 $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+addr+"&key=AIzaSyD44zJbkJPUMwyxgzc554jzYNXAvA009hU")
				 .success(function(data){
					 if(data.results[0]!=undefined){
						 $scope.gcodeDisplay= "geolocation: "+ data.results[0].geometry.location.lat +","+data.results[0].geometry.location.lng;
						 console.log($scope.gcodeDisplay)
					 }
					 console.log(data);
				 });
		 });
		//trying different way of geolocation retrival, some how XiaoMi phone is not able to retrive GPS information
        // navigator.geolocation.getCurrentPosition(function(pos) {
			// var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			// var mapOptions = {
				// center: myLatlng,
				// zoom: 16,
				// mapTypeId: google.maps.MapTypeId.ROADMAP
			// };
	 
			// var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            // map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            // var myLocation = new google.maps.Marker({
                // position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                // map: map,
                // title: "My Location"
            // });
        // });
		// $cordovaGeolocation.getCurrentPosition(options).then(function(position){
			// var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			// var mapOptions = {
				// center: myLatlng,
				// zoom: 16,
				// mapTypeId: google.maps.MapTypeId.ROADMAP
			// };
	 
			// var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			// map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            // var myLocation = new google.maps.Marker({
                // position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                // map: map,
                // title: "My Location"
            // });
		// });
        $scope.map = map;
    });
 
});