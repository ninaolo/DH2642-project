<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $table = "a_activities";
    public $timestamps = false;
     // The attributes that are mass assignable.
    protected $fillable = [
        'name', 'type', 'duration','description','agenda_id'
    ];

    public function user() {
      return $this->belongsTo('App\User');
    }

    public function agenda() {
      return $this->belongsTo('App\Agenda');
    }
}
