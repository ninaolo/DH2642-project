<?php

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

        // User resource API
        Route::get('users', 'UsersController@index');
        Route::post('users', 'UsersController@store');
        Route::get('users/{id}', 'UsersController@show');
        Route::put('users/{id}', 'UsersController@update');
        Route::delete('users/{id}', 'UsersController@destroy');

    });

});
