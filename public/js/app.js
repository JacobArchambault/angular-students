
var app = angular.module('carsApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/all_cars.html',    // route for the home page
            controller: 'allCtrl'
        })
        .when('/all_cars', {
            templateUrl: 'partials/all_cars.html',
            controller: 'allCtrl'
        })
        .when('/add_car', {
            templateUrl: 'partials/add_car.html',    // add a car to db
            controller: 'addCtrl'
        })
        .when('/edit_cars', {
            templateUrl: 'partials/edit_cars.html',    // edit a car record
            controller: 'editCtrl'
        })
        .otherwise({
            redirectTo: 'partials/all_cars.html'        // any other URL goes to home
        });
});

/*   a controller for each page  */
app.controller('allCtrl', function ($scope, $http) {

    $http.get("/showAll")          // get all the cars 
        .then(function (response) {
            $scope.cars = response.data;
        });
});


app.controller('addCtrl', function ($scope, $http) {

    $scope.addRecord = function () {
        $http.post("/addCar", {
            cid: Math.floor(Math.random() * 1000) + 100,
            year: $scope.year,
            make: $scope.make,
            model: $scope.model,
            miles: $scope.miles,
            price: $scope.price,
            dealer_id: $scope.dealer_id
        })                // post the object data
            .then(function (response) {
                $scope.status = response.data;  //print status of request

                // clear textboxes
                $scope.year = "";
                $scope.make = "";
                $scope.model = "";
                $scope.miles = "";
                $scope.price = "";
                $scope.dealer_id = "";
            });
    };
});


app.controller('editCtrl', function ($scope, $http) {  // edit miles or price of record
    $scope.carIndex = 0;

    $http.get("/showAll")
        .then(function (response) {
            $scope.cars = response.data;
            $scope.car = $scope.cars[$scope.carIndex];
            $scope.maxIndex = $scope.cars.length - 1;  // index of last car object
        });

    $scope.nextRecord = function () {
        $scope.carIndex += 1;        // go to next car object
        if ($scope.carIndex > $scope.maxIndex)
            $scope.carIndex = $scope.maxIndex;

        $scope.car = $scope.cars[$scope.carIndex];
    };

    $scope.previousRecord = function () {
        $scope.carIndex -= 1;        // go to previous car index
        if ($scope.carIndex < 0)
            $scope.carIndex = 0;

        $scope.car = $scope.cars[$scope.carIndex];
    };

    $scope.updateRecord = function () {
        var car = $scope.cars[$scope.carIndex]
        $http.post("/updateCar", {
            cid: car.cid,
            miles: car.miles,
            price: car.price
        })
            .then(function (response) {
                $scope.car = $scope.cars[$scope.carIndex];
            });
    }

    $scope.deleteRecord = function () {
        $http.get("/deleteCar?cid=" + $scope.cars[$scope.carIndex].cid)
            .then(function (response) {
                //$scope.car = response.data;
                console.log($scope.car)
                $scope.maxIndex = $scope.cars.length - 1;
                $scope.car = $scope.cars[$scope.carIndex];
            });
    };
});