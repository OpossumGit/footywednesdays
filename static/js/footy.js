var app = angular.module('footyApp', ['ngTouch','ui-notification']);

app.controller('bodyController', function($scope, $http, Notification){
	$scope.rightSwipe = function(){
		switch($('.tab-pane.active').attr('id')) {
		    case 'page1':
		        $('[href="#page3"]').tab('show');
		        break;
	   	    case 'page2':
		        $('[href="#page1"]').tab('show');
		        break;
		    case 'page3':
		        $('[href="#page2"]').tab('show');
		        break;
		} 
	};

	$scope.leftSwipe = function(){
		switch($('.tab-pane.active').attr('id')) {
		    case 'page1':
		        $('[href="#page2"]').tab('show');
		        break;
	   	    case 'page2':
		        $('[href="#page3"]').tab('show');
		        break;
		    case 'page3':
		        $('[href="#page1"]').tab('show');
		        break;
		} 
	};

	$http.get('api/notifikacija').then(function(response){
		if (response.data) Notification(response.data.text);
	});

});

app.controller('NextWednesdayController', function(){

	var dif;
	var d = new Date(); // Today's date

	if (d.getDay() != 3) { // ako nije danas potraži iduću srijedu
		dif = 7 - ((d.getDay() + 4) % 7); // Number of days to add until wednesday
		d.setDate(d.getDate() + dif);
	}
	d.setHours(19);
	d.setMinutes(0);
	this.day = d.getDate();
	this.month = d.getMonth()+1;
	this.when = moment(d).fromNow();

});

app.controller('RegistrationController', function($scope, $http, $rootScope) {

	var registrations = this;

	var getRegistrations = function() {
		$http.get('api/prijave').then(function(response){
			registrations.players = response.data;
			$('#prijavePill').html('Prijave <small>('+registrations.players.length+')</small>');
			registrations.players.forEach( function (player)
			{
			   if (moment(player.date).isBefore(new Date())) {
				player.ago = moment(player.date).fromNow();
			   } else {
				player.ago = moment(new Date()).fromNow();
			   };
			});

			$('#footerBar').html(registrations.players.length + '/12');
			var pct = (registrations.players.length/12)*100;
			$('#footerBar').attr('style', 'width:'+pct+'%');
			if (pct >= 100) {
				$('#footerBar').addClass('progress-bar-success');
			} else if (pct < 80) {
				$('#footerBar').addClass('progress-bar-danger');
			} else {
				$('#footerBar').removeClass('progress-bar-success');
				$('#footerBar').removeClass('progress-bar-danger');
			}
		});
	};

	getRegistrations();
	
	$scope.submitPlayer = function(){
		if (!$scope.newPlayer) return;
		$http.post('api/prijave?name=' + $scope.newPlayer).then(function(response){
			getRegistrations();
		});
		$scope.newPlayer = '';
	};

	$scope.deletePlayer = function(index){
		bootbox.confirm('Briši "' + registrations.players[index].name+ '"?', function(result) {
  			if (result) {
  				$http.delete('api/prijave?id=' + registrations.players[index]._id).then(function(response){
					getRegistrations();
				});
  			};
		}); 
		
	};

	$rootScope.$on('refreshRegularsEvent', function(event) { getRegistrations(); });

	});

app.controller('AbsenceController', function($scope, $http) {

	var absences = this;

	var getAbsences = function() {
		$http.get('api/nemogu').then(function(response){
			absences.players = response.data;
			$('#neMoguPill').html('Ne mogu <small>('+absences.players.length+')</small>');
			absences.players.forEach( function (player)
			{
			   if (moment(player.date).isBefore(new Date())) {
				player.ago = moment(player.date).fromNow();
			   } else {
				player.ago = moment(new Date()).fromNow();
			   }
			});
		});
	};

	getAbsences();
	
	$scope.submitPlayer = function(){
		if (!$scope.newPlayer) return;
		$http.post('api/nemogu?name=' + $scope.newPlayer).then(function(response){
			getAbsences();
		});
		$scope.newPlayer = '';
	};

	$scope.deletePlayer = function(index){
		bootbox.confirm('Briši "' + absences.players[index].name+ '"?', function(result) {
  			if (result) {
				$http.delete('api/nemogu?id=' + absences.players[index]._id).then(function(response){
					getAbsences();
				});
			};
		}); 
	};

	});

app.controller('RegularsController', function($scope, $http, $rootScope) {

	var regulars = this;

	var getRegulars = function() {
		$http.get('api/stalni').then(function(response){
			regulars.players = response.data;
			$('#stalniPill').html('Stalni <small>('+regulars.players.length+')</small>');
		}); 
	};

	getRegulars();
	
	$scope.submitPlayer = function(){
		if (!$scope.newPlayer) return;
		$http.post('api/stalni?name=' + $scope.newPlayer).then(function(response){
			getRegulars();
		});
		$scope.newPlayer = '';
	};

	$scope.deletePlayer = function(index){
		bootbox.confirm('Briši "' + regulars.players[index].name+ '"?', function(result) {
  			if (result) {
				$http.delete('api/stalni?id=' + regulars.players[index]._id).then(function(response){
					getRegulars();
				});
			};
		}); 
	};


	$scope.registerPlayer = function(index){
		$http.post('api/prijave?name=' + regulars.players[index].name).then(function(response){
			$rootScope.$emit('refreshRegularsEvent');
			bootbox.alert(regulars.players[index].name + ' je prijavljen.');
		});
			
	};

	$scope.is9999 = function(date){
	    return date.substring(0,4)=='9999';
	};

	});

moment.locale('hr');
