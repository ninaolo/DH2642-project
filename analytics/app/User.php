<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    protected $table = "a_users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function activities() {
      return $this->hasMany('App\Activity'); // One-to-many relationship
    }

    public function agendas() {
      return $this->belongsToMany('App\Agenda', 'a_attendees'); // Many-to-many relationship
    }

}
