<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgendasActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('a_agendas_activities', function (Blueprint $table) {
          $table->integer('agenda_id')->unsigned();
          $table->integer('activity_id')->unsigned();
          $table->foreign('agenda_id')
              ->references('id')
              ->on('a_agendas');
          $table->foreign('activity_id')
              ->references('id')
              ->on('a_activities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('a_agendas_activities');
    }
}
