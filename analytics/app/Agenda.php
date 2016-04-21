<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $table = "a_agendas";
    public $timestamps = false;

    // The attributes that are mass assignable.
   protected $fillable = [
       'description','date'
   ];

    public function activities() {
      return $this->hasMany('App\Activity');
    }
}
