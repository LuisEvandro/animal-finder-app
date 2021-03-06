<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function (){
    return response()->json('Unauthorized.', 401);
});

$router->group(['prefix' => env('API_VERSION', 'api/v1')], function ($router){
    //Rotas de dono de animal
	$router->group(['prefix' => 'animalOwner', 'middleware' => 'auth'], function ($router) {
        $router->post('create[/{guid}]', 'AnimalOwnerController@CreateAnimalOwner');
        $router->get('{guid}', 'AnimalOwnerController@ShowAnimalOwner');
		$router->post('list', 'AnimalOwnerController@ListAnimalOwner');
        $router->delete('delete/{guid}', 'AnimalOwnerController@DeleteAnimalOwner');
    });
	//Rotas de animals
	$router->group(['prefix' => 'animal', 'middleware' => 'auth'], function ($router) {
		$router->post('create[/{guid}]', 'AnimalsController@CreateOrUpdateAnimal');
		$router->delete('delete/{guid}', 'AnimalsController@DeleteAnimal');
	});
	//Rotas de animals aberta
	$router->group(['prefix' => 'animals',], function ($router) {
		$router->post('list', 'AnimalsController@ListAnimals');
		$router->get('{guid}', 'AnimalsController@ShowAnimal');
	});
	//Login
	$router->group(['prefix' => 'auth'], function ($router) {
		$router->post('login', 'LoginController@Login');
		$router->post('animalOwner/create', 'LoginController@CreateAnimalOwner');
	});
	//Rotas de notificações
	$router->group(['prefix' => 'notification', 'middleware' => 'auth'], function ($router) {
		$router->post('{guid}', 'NotificationController@ListNotifications');
	});
	//Rotas de notificações aberta
	$router->group(['prefix' => 'notifications'], function ($router) {
		$router->post('create', 'NotificationController@CreateNotification');
	});
});
