angular.module('alurapic').controller('FotosController', function ($scope, restService) {
    
    $scope.filtro = '';
    $scope.fotos = [];
    $scope.msg = '';

    restService.query(function(fotos){
        $scope.fotos = fotos;
    },
    function(error){
        console.log(error);    
    });

    $scope.remover = function(foto) {
        restService.delete({fotoId : foto._id}, function(){
            $scope.fotos.splice($scope.fotos.indexOf(foto), 1); //index , amount of fotos
            if(foto.titulo != undefined && foto != null) {
                $scope.msg = 'Foto ' + foto.titulo + ' removida com sucesso';
            }
        },
        function() {
            if(foto.titulo != undefined && foto != null) {
                $scope.msg = 'Falha ao remover a foto ' + foto.titulo;
            }
            console.log(erro);
        });
    };

});
