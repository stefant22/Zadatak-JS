var app = angular.module('myApp', ['ui.bootstrap']);
app.controller('MyCtrl', function ($scope, $window, $http, $uibModal) {
	var vm = this;
	vm.searchText = "";
	vm.filteri = [];
	vm.recepti = [];
	vm.currentPage = 1;
	vm.itemsPerPage = 30;
	vm.totalItems = "";
	vm.maxSize = 5;
	vm.recept = null;
	vm.totalItems = "";
	vm.label = "";
	vm.healthFilter = "";
	vm.comment = "";
	vm.username = "";
	vm.password = "";
	vm.ulogovan = false;
	vm.kalorijeOd = "";
	vm.kalorijeDo = "";
	vm.kalorijeOdDo = "";
	vm.maxI = "";
	vm.maxIngr = "";

	vm.newLabel="";
	vm.newCalories="";
	vm.newUrl="";
	vm.newImage="";
	vm.newIngr=[];
	vm.newDietLabels=[];
	vm.newHealthLabels=[];
	vm.newRecipe={};
	vm.pretraga=0;
	vm.komentar = [];
	vm.users = [{
			username: 'nikola',
			password: 'nikola123'
		},
		{
			username: 'milos',
			password: 'milos123'
		}
	];
	vm.sacuvani = [];

	$scope.alerts = [];

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};

	vm.login = function () {
		console.log(vm.users);
		for (var i in vm.users) {
			if (vm.username == vm.users[i].username && vm.password == vm.users[i].password) {
				vm.ulogovan = true;
				console.log("ulogovan");
				$('#login').modal('hide');

			}

		}
		if (vm.ulogovan == true) {
			$scope.alerts.push({
				type: 'success',
				msg: 'Login successful welcome ' + vm.username
			});
		} else {
			$scope.alerts.push({
				type: 'danger',
				msg: 'wrong username or password'
			});
		}

	};

	vm.logout = function () {
		vm.ulogovan = false;
		$scope.alerts.push({
			type: 'success',
			msg: 'Goodbye ' + vm.username
		});
	};

	vm.register = function () {
		for (var i in vm.users) {
			if (vm.regUsername == vm.users[i].username) {
				vm.postojeci = true;

			}
		}

		if (vm.postojeci == true) {
			$scope.alerts.push({
				type: 'danger',
				msg: 'This username is already taken'
			});
		} else {

			vm.novKorisnik = {
				username: vm.regUsername,
				password: vm.regPassword
			};
			vm.users.push(vm.novKorisnik);
			console.log(vm.users);
			$('#register').modal('hide');
			$scope.alerts.push({
				type: 'success',
				msg: 'Registration was successful'
			});

		}
	};

	vm.clear = function () {
		vm.filter = document.getElementsByClassName('filter');
		for (i = 0; i < vm.filter.length; i++) {
			vm.filter[i].checked = false;
		}
		vm.searchText = "";

	}

	vm.search = function () {
		if (vm.maxIngr != "") {
			vm.maxI = "&ingr=" + vm.maxIngr;
		}
		vm.recept = null;
		if (vm.kalorijeOd != "" & vm.kalorijeDo != "") {
			vm.kalorijeOdDo = "&calories=gte " + vm.kalorijeOd + ",lte " + vm.kalorijeDo;
		}
		console.log(vm.kalorijeOdDo);
		vm.filter = document.getElementsByClassName('filter');
		vm.fil = '';

		for (i = 0; i < vm.filter.length; i++) {
			if (vm.filter[i].checked === true) {
				vm.fil += vm.filter[i].value + "";

			}
		}

		vm.sastojci = "";
		vm.recepti = [];
		var req2 = {
			method: "GET",
			url: "https://api.edamam.com/search?q=" + vm.searchText + "&app_id=b5e1ec28&app_key=793a7f95e9997c9af8a080884a4b1264&to=1000" + vm.fil + vm.label + vm.kalorijeOdDo + vm.maxI
		}
		$http(req2).then(

			function (resp) {
				console.log(resp);

				for (var i = 0; i < resp.data.hits.length; i++) {
					vm.recepti.push(resp.data.hits[i].recipe);

				}

			},
			function (resp) {
				vm.message = 'error';

			});

		console.log("dada" + vm.label);
		vm.label = '';

	};

	vm.healthFilter = function (health) {
		vm.label = "&health=" + health.toLowerCase();
		return vm.label;

	};

	vm.dietFilter = function (diet) {
		vm.label = "&diet=" + diet.toLowerCase();
		return vm.label;

	};

	vm.selektujRecept = function (el) {

		vm.recept = el;
		console.log(vm.recept);

	};

	vm.komentarisi = function () {
		if (vm.ulogovan == true && vm.comment.length > 0) {
			vm.komentar.push({
				username: vm.username,
				komentar: vm.comment
			});
			vm.recept.komentar = vm.komentar;

		} else if (vm.ulogovan == false) {
			$scope.alerts.push({
				type: 'danger',
				msg: 'You need to be logged in to comment'
			});
			$('#login').modal('show');
		}
		if (vm.comment.length < 1) {

			$scope.alerts.push({
				type: 'danger',
				msg: 'Comment field is empty'
			});
		}
		vm.comment = "";
		console.log(vm.comment.length)
		console.log(vm.recept);
	}

	vm.sacuvaj = function (el) {
		if (vm.ulogovan == true) {
			$scope.alerts.push({
				type: 'success',
				msg: 'Recipe saved '
			});
			vm.sacuvani.push(el);
			console.log(vm.sacuvani);
		} else {
			$scope.alerts.push({
				type: 'danger',
				msg: 'You need to be logged in to save recipe '
			});
		}
	}

	vm.sacuvaniRecepti = function () {
		vm.recepti = vm.sacuvani;
	}

	$('.dropdown-menu').on('click', function (e) {
		e.stopPropagation();
	});

	vm.dodajNoviRecept=function(){
		var hIngr=[];
		var dietLabels=[];
		var healthLabels=[];

		vm.newRecipe.label=vm.newLabel;
		vm.newRecipe.calories=vm.newCalories;
		vm.newRecipe.url=vm.newUrl;
		vm.newRecipe.image=vm.newImage;

		if(vm.newIngr.includes(',')){
		vm.newRecipe.ingredientLines=vm.newIngr.split(",");
	}else{
		hIngr.push(vm.newIngr);
		vm.newRecipe.ingredientLines=hIngr;
	}
		
		vm.newDietLabels = document.getElementsByClassName('dietLabels');
		
		for (var i = 0; i < vm.newDietLabels.length; i++) {
			if (vm.newDietLabels[i].checked === true) {
				dietLabels.push( vm.newDietLabels[i].value);

			}
		}
		vm.newRecipe.dietLabels=dietLabels;

		vm.newHealthLabels = document.getElementsByClassName('healthLabels');
		
		for (var i = 0; i < vm.newDietLabels.length; i++) {
			if (vm.newHealthLabels[i].checked === true) {
				healthLabels.push( vm.newHealthLabels[i].value);

			}
		}
		vm.newRecipe.healthLabels=healthLabels;
		console.log(vm.newRecipe);

		vm.recepti.push(vm.newRecipe);
		
	}

});