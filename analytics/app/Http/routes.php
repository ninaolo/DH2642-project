<?php
use App\User;
use App\Agenda;

// Middleware = user authentication. If user not authenticated, these routes
// will redirect to login page.

Route::group(['middleware' => ['web']], function () {

    // Initial route
    Route::get('/', 'HomeController@home');

    // REST API
    Route::group(array('prefix' => 'api'), function() {

        // Login/auth API
        Route::post('login', 'LoginLogoutController@login');
        Route::get('logout', 'LoginLogoutController@logout');
        Route::get('checklogin', 'LoginLogoutController@checkLogin');

        // Users resource API
        Route::get('users', 'UsersController@index');
        Route::post('users', 'UsersController@store');
        Route::get('users/{id}', 'UsersController@show');
        Route::put('users/{id}', 'UsersController@update');
        Route::delete('users/{id}', 'UsersController@destroy');

        // Agendas resource API
        Route::get('agendas', 'AgendasController@index');
        Route::post('agendas', 'AgendasController@store');
        Route::get('agendas/{id}', 'AgendasController@show');
        Route::put('agendas/{id}', 'AgendasController@update');
        Route::delete('agendas/{id}', 'AgendasController@destroy');

        // Activities resource API
        Route::get('activities', 'ActivitiesController@index');
        Route::post('activities', 'ActivitiesController@store');
        Route::get('activities/{id}', 'ActivitiesController@show');
        Route::put('activities/{id}', 'ActivitiesController@update');
        Route::delete('activities/{id}', 'ActivitiesController@destroy');

        // Many-to-many relational resource for agendas
        Route::get('agendas/{id}/users', function($id) {
          return Agenda::find($id)->users()->get();
        });

        // Many-to-many relational resource for users
        Route::get('users/{id}/agendas', function($id) {
          return User::find($id)->agendas()->get();
        });

    });

});
