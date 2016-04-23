<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgendaUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('agenda_user', function (Blueprint $table) {
        $table->integer('agenda_id')->unsigned();
        $table->foreign('agenda_id')
              ->references('id')
              ->on('a_agendas');
        $table->integer('user_id')->unsigned();
        $table->foreign('user_id')
              ->references('id')
              ->on('a_users');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('agenda_user');
    }
}
