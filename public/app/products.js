app.controller('ProductsCtrl', function($scope,kingsService,Elo) {

var self=this;
self.name="Siddhu Vydyabhushana";
self.data={};
$scope.myRating = 1600;
  $scope.opponentRating = 1700;
  $scope.gameResult = '1';

  $scope.calculateNewRating = function() {
    $scope.newRating = Elo.getNewRating(+$scope.myRating, +$scope.opponentRating, +$scope.gameResult);
    $scope.ratingDelta = Elo.getRatingDelta(+$scope.myRating, +$scope.opponentRating, +$scope.gameResult);
  };

  $scope.calculateNewRating();

kingsService.getKings().then(function(response){
  self.data=response.data.data;
});

});