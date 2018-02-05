angular.module('services', ['ngResource'])
.factory('restService', function($resource) {
    return $resource('/v1/fotos/:fotoId', null, {
        update: {method : 'PUT'}
    });
})
.factory('crudFoto', function(restService, $q) {
    var servico = {};
    servico.cadastrar = function(foto) {
        return $q(function(resolve, reject) {
            if(foto._id) {
                restService.update({fotoId: foto._id}, foto, function() {
                    resolve({
                        msg : 'Foto atualizada com sucesso!',
                        inclusao : false
                    });
                }, 
                function(error) {
                    reject({msg: 'Não foi possível atualizar a foto.'});
                    console.log(error);
                });
            } else {
                restService.save(foto, function() {
                    resolve({
                        msg : 'Foto cadastrada com sucesso!',
                        inclusao : true
                    });
                }, 
                function(error) {
                    reject({msg: 'Não foi possível cadastrar a foto.'});
                    console.log(error);
                });
            }
        });
    }

    servico.listar = function(fotoId) {
        return $q(function(resolve, reject) {
            if(fotoId) {
                restService.get({fotoId: fotoId}, function(foto) {
                    resolve({
                        foto: foto,
                        msg: 'Foto recuperada com sucesso!'
                    });
                },
                function(error) {
                    reject({msg: 'Não foi possível recuperar a foto!'});
                    console.log(error);    
                });
            } else {
                restService.query(function(fotos) {
                    resolve({
                        fotos: fotos,
                        msg: 'Fotos recuperadas com sucesso!'
                    });
                },
                function(error){
                    reject({msg: 'Falha ao recuperar as fotos!'});
                    console.log(error);    
                });
            }
        });
    }

    servico.deletar = function(foto) {
        return $q(function(resolve, reject) {
            if(foto._id) {
                restService.delete({fotoId : foto._id}, function() {
                    resolve({msg: 'Foto removida com sucesso!'});
                },
                function(error) {
                    reject({msg: 'Falha ao remover a foto!'});
                    console.log(erro);
                });
            } else {
                reject({msg: 'Falha ao remover a foto! Id indefinido!'});
                console.log('Falha ao remover a foto! Id indefinido!');
            }
        });
    }

   return servico;
});