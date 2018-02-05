angular.module('services', ['ngResource'])
.factory('restService', function($resource) {
    return $resource('/v1/fotos/:fotoId', null, {
        update: {method : 'PUT'}
    });
});