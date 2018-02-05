
var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('MyCtrl', function($scope, $window, $http, $uibModal) {
    var vm = this;


vm.tacniOdgovori=[];
vm.ponudjeniOdgovori=[];
vm.oblast="";
vm.limit=0;
vm.grad="";
vm.pogodjeniOdgovori=[];
vm.vreme;
vm.izabraniOdgovori=[];
vm.promaseniOdgovori=[];
vm.posto=0;
vm.zavrsena=false;
vm.mixNiz=[];


$http.get('podaci.json').then(function(data){
    console.log(data);
    
    vm.tacniOdgovori=data.data.tacno;
    vm.ponudjeniOdgovori=data.data.ponudjene;
    vm.oblast=data.data.oblast;
    vm.vreme=data.data.vreme;
});

vm.izaberiOdgovor=function(el){
    vm.izabraniOdgovori.push(el);
    console.log(vm.izabraniOdgovori);


}

vm.izbaci=function(el){
    for(var i=0;i<vm.izabraniOdgovori.length;i++){
        if(vm.izabraniOdgovori[i]==el){
            vm.izabraniOdgovori.splice(i,1);
            console.log(vm.izabraniOdgovori);
        }

    }


console.log("dsadasda");
}

function odbrojavanje(){
    if(vm.vreme!=0){
    
    document.getElementById("vreme").innerHTML =vm.vreme;
    vm.vreme--;
} else{
    document.getElementById("vreme").innerHTML ="";
    document.getElementById("tekst").innerHTML ="vase vreme je isteklo";
    document.getElementById("tekst").style.color="red";
    document.getElementById("grad").disabled=true;
    vm.zavrsena=!vm.zavrsena;
    vm.potvrdi();
    console.log(vm.zavrsena);
}


}

setInterval(odbrojavanje,1000);


vm.potvrdi=function(){
    
    
    for (var i = 0; i < vm.tacniOdgovori.length; i++) {
        for (var j = 0; j < vm.izabraniOdgovori.length; j++) {
            if (vm.izabraniOdgovori[j] === vm.tacniOdgovori[i]) {
                vm.pogodjeniOdgovori.push(vm.tacniOdgovori[i]);
                vm.mixNiz=vm.izabraniOdgovori.concat(vm.pogodjeniOdgovori);
                console.log("131231");
                console.log(vm.pogodjeniOdgovori);
                console.log(vm.mixNiz);
              
           
                
            }
            
        }
    }

    for(var i=0;i<vm.mixNiz.length;i++){
        if (vm.izabraniOdgovori.indexOf(vm.mixNiz[i]) == -1 || vm.pogodjeniOdgovori.indexOf(vm.mixNiz[i]) == -1) {
            vm.promaseniOdgovori.push(vm.mixNiz[i]);
            console.log(vm.promaseniOdgovori);
          }

    }


    
    console.log("ok");
    console.log("ok2");




    vm.posto=vm.pogodjeniOdgovori.length/vm.izabraniOdgovori.length*100;
  

    console.log(vm.pogodjeniOdgovori);
    
   console.log("posto: "+vm.posto);
   
   
   
}







console.log(vm.pogodjeniOdgovori);







});