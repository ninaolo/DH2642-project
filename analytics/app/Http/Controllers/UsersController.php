<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class UsersController extends Controller
{
    public function index()
    {
        return response(User::all());
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response($user);
    }

    public function store(Request $request)
    {
        $credentials = [
                  'name' => $request->input('name'),
                  'email' => $request->input('email'),
                  'password' => $request->input('password'),
                  'password_confirmation' => $request->input('password_confirmation'),
              ];

        $login = [
                'email' => $request->input('email'),
                'password' => $request->input('password'),
              ];

        if (User::where('email', '=', $credentials['email'])->count() > 0) {
            return response()->json([
                  'status' => 'error',
                  'info' => 'This email is already registered.',
                ], 400);
        }

        if (
                  strlen($credentials['name']) <= 50 &&
                  strlen($credentials['name']) >= 5 &&
                  filter_var($credentials['email'], FILTER_VALIDATE_EMAIL) &&
                  strlen($credentials['password']) <= 50 &&
                  strlen($credentials['password']) >= 6 &&
                  $credentials['password_confirmation'] == $credentials['password']
              ) {
            User::create([
                      'name' => $credentials['name'],
                      'email' => $credentials['email'],
                      'password' => bcrypt($credentials['password']),
                  ]);
            Auth::attempt($login);

            return response()->json([
                    'user' => Auth::user(),
                    'header' => 'Welcome '.$credentials['name'].'!',
                    'info' => 'The registration was successful.',
                  ], 200);
        } else {
            return response()->json('', 400);
        }
    }

    public function update($id, Request $request)
    {
      // TODO
    }

    public function destroy($id)
    {
        // TODO
    }
}
