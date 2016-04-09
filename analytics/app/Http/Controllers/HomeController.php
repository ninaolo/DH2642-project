<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Product;
use App\User;

class HomeController extends Controller
{

    public function home() {
        return view('startview');
    }

}
