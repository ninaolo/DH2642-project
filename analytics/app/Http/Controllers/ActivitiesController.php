<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Activity;
use App\Http\Requests;
use Auth;

class ActivitiesController extends Controller
{

  public function index(Request $request)
  {
    // Handles requests such as ".../api/activities?agenda_id=1&type=someType"
    return response(Activity::where($request->toArray())->get());
  }

  public function show($id)
  {
    return response(Activity::findOrFail($id));
  }

  public function store(Request $request)
  {
    if ($this->inputIsValid($request)) {

        $activity = new Activity($request->all());
        Auth::user()->activities()->save($activity);
        return response()->json($request->toArray(), 200);
    } else {
        return response()->json([
        'error' => 'Invalid input',
        'request' => $request->toArray()]
        , 400);
    }
  }

  public function update($id, Request $request)
  {
    if ($this->inputIsValid($request)) {
      $activity = Activity::findOrFail($id);
      $activity->update($request->toArray());
      if($activity->update($request->toArray())) {
        return response()->json('', 200);
      } else {
        return response()->json('', 400);
      }
    } else {
      return response()->json('', 400);
    }
  }

  public function destroy($id)
  {
      $activity = Activity::findOrFail($id);
      $activity->delete();
  }

  private function inputIsValid($request) {
    if (
              strlen($request->input('name')) <= 30 &&
              strlen($request->input('name')) >= 2 &&
              $request->input('duration') <= 60 &&
              $request->input('duration') >= 1
          ) {
            return true;
          } else {
            return false;
          }
  }
}
