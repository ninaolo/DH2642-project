<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $table = "a_agendas";
    public $timestamps = false;

    // The attributes that are mass assignable.
   protected $fillable = [
       'description', 'date', 'name', 'link', 'enddate', 'google_id'
   ];

    public function activities() {
      return $this->hasMany('App\Activity'); // One-to-many relationship
    }

    public function users() {
      // Many-to-many relationship
      return $this->belongsToMany('App\User');
    }
}
