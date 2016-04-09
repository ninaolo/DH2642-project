<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use App\User;

class LoginLogoutController extends Controller
{

    public function login(Request $request) {

    	// Get the credentials from the form
    	$credentials = [
    		"email" => $request->input("email"),
    		"password" => $request->input("password")
    	];

    	if(!Auth::attempt($credentials)) {
    		return response("Username and password does not match.",  400);
    	}

    	return response(Auth::user(), 201);
    }

    public function logout() {
    	if(Auth::user()) {
    		Auth::logout();
    		return response()->json([
                "header" => "You have been logged out.",
                "info" => "Come back another time!"
            ]);
    	}
    }

    public function checkLogin() {
        if (Auth::user()) {
            return response(Auth::user());
        } else {
            return response('false');
        }
    }

    public function show($id)
    {
      $user = User::findOrFail($id);
      return response($user);
    }

}
