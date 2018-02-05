angular.module('alurapic').controller('FotosController', function ($scope, restService, crudFoto) {
    
    $scope.filtro = '';
    $scope.fotos = [];
    $scope.msg = '';

    crudFoto.listar()
    .then(function(dado) {
        $scope.fotos = dado.fotos;
    })
    .catch(function() {
        console.log(dado.msg);
    });

    $scope.remover = function(foto) {

        crudFoto.deletar(foto)
        .then(function(dado) {
            $scope.fotos.splice($scope.fotos.indexOf(foto), 1); //index , amount of fotos
            $scope.msg = dado.msg;
        })
        .catch(function(dado) {
            $scope.msg = dado.msg;
        });
    };

});
