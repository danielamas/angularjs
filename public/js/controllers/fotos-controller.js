angular.module('alurapic').controller('FotosController', function ($scope, $http) {
    
    $scope.filtro = '';
    $scope.fotos = [];
    $scope.msg = '';

    $http.get('/v1/fotos')
    .success(function(retorno) {
        $scope.fotos = retorno;
    })
    .error(function(erro) {
        console.log(erro)
    });

    $scope.remover = function(foto) {
        $http.delete('/v1/fotos/' + foto._id)
        .success(function() {
            $scope.fotos.splice($scope.fotos.indexOf(foto), 1); //index , amount of fotos
            if(foto.titulo != undefined && foto != null) {
                $scope.msg = 'Foto ' + foto.titulo + ' removida com sucesso';
            }
        })
        .error(function(erro) {
            if(foto.titulo != undefined && foto != null) {
                $scope.msg = 'Falha ao remover a foto ' + foto.titulo;
            }
            console.log(erro)
        });
    };

});
