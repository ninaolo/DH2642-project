<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Agenda;
use App\Http\Requests;

class AgendasController extends Controller
{
  public function index()
  {
    return response(Agenda::all());
  }

  public function show($id)
  {
    return response(Agenda::findOrFail($id));
  }

  public function store(Request $request)
  {
    if (
              strlen($request->input('name')) <= 30 &&
              strlen($request->input('name')) >= 2 &&
              strlen($request->input('description')) <= 100 &&
              strlen($request->input('description')) >= 2
          ) {
        Agenda::create($request);
        return response()->json('', 200);
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
