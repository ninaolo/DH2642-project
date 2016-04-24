<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Agenda;
use App\Http\Requests;
use App\Activity;

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
        if ($this->inputIsValid($request)) {

          // Create the agenda.
          $agenda = new Agenda($request->except('attendees', 'activities'));
          $agenda->save();

          // Add attendees to agenda_user table as many-to-many relationship.
          foreach ($request->input('attendees') as $attendeeId) {
              $agenda->users()->attach(1, ['agenda_id' => $agenda->id, 'user_id' => $attendeeId]);
          }

          // Add agenda_id to a_activities table.
          foreach ($request->input('activities') as $activityId) {
              $activity = Activity::find($activityId);
              $activity->agenda_id = $agenda->id;
              $activity->save();
          }

              return response()->json('', 200);
          } else {
              return response()->json('', 400);
          }
    }

    public function update($id, Request $request)
    {
        if($this->inputIsValid($request)) {
          $agenda = Agenda::findOrFail($id);
          $agenda->update($request->except('attendees', 'activities'));

          // Remove all old attendees.
          $agenda->users()->detach();

          // Add attendees to agenda_user table as many-to-many relationship.
          foreach ($request->input('attendees') as $attendeeId) {
              $agenda->users()->attach(1, ['agenda_id' => $agenda->id, 'user_id' => $attendeeId]);
          }

          // Remove this agenda_id from all its activities.
          foreach($agenda->activities() as $activity) {
            $activity = Activity::find($activityId);
            $activity->agenda_id = 0;
            $activity->save();
          }

          // Add agenda_id to a_activities table.
          foreach ($request->input('activities') as $activityId) {
              $activity = Activity::find($activityId);
              $activity->agenda_id = $agenda->id;
              $activity->save();
          }

          return response()->json([
                  'header' => 'Your agenda was successfully updated!',
                  'info' => 'Both your agenda here on Meeter and you Google
                  Calendar event were updated with your changes.',
                ], 200);
        } else {
          return response()->json('', 400);
        }

    }

    public function destroy($id)
    {
        $agenda = Agenda::findOrFail($id);
        $agenda->delete();
    }

    private function inputIsValid($request)
    {
        if (
            strlen($request->input('name')) <= 30 &&
            strlen($request->input('name')) >= 2 &&
            strlen($request->input('description')) <= 100 &&
            strlen($request->input('description')) >= 2
          ) {
            return true;
        } else {
            return false;
        }
    }
}
