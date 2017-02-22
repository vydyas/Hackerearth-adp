app.factory('kingsService',function($http){
    var service={};
service.getKings=function(){
   return $http.get("/api/kings");
};

service.getWinLoss=function(id){
   return $http.get("/api/king/"+id);
};

service.getKingInfo=function(id){
   return $http.get("/api/kinginfo/"+id);
};


return service;
});