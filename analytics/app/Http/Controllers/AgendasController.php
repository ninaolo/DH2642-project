<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Agenda;
use App\Http\Requests;
use Auth;

class AgendasController extends Controller
{
  public function index(Request $request)
  {
    // Handles requests such as ".../api/agendas?description='hej'"
    return response(Agenda::where($request->toArray())->get());
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
        $agenda = new Agenda($request->all());
        Auth::user()->agendas()->save($agenda);
        return response()->json('', 200);
    } else {
        return response()->json('', 400);
    }
  }

  // TODO: check input.
  public function update($id, Request $request)
  {
    dd($request);
    $agenda = Agenda::findOrFail($id);
    $agenda->update($request->toArray());
    if($agenda->update($request->toArray())) {
      return response()->json('', 200);
    } else {
      return response()->json('', 400);
    }
  }

  public function destroy($id)
  {
      $agenda = Agenda::findOrFail($id);
      $agenda->delete();
  }
}
