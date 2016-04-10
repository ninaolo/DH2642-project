<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('a_agendas', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('activity_id')->unsigned();
          $table->foreign('activity_id')
              ->references('id')
              ->on('a_activities')
              ->onDelete('cascade');
      });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
