<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $table = "a_agendas";

    public function activities() {
      return $this->hasMany('App\Activity');
    }
}
