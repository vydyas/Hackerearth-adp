app.controller('SingleProductController',function($scope,$routeParams,kingsService) {

var self=this;

self.data={};
self.kingInfo={};
self.id=$routeParams.id;

kingsService.getWinLoss(self.id).then(function(response){
  self.data=response.data.data[0];
});

kingsService.getKingInfo(self.id).then(function(response){
  self.kingInfo=response.data.data;
});

});