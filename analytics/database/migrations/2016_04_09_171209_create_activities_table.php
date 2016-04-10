<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('a_activities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('type');
            $table->dateTime('duration');
            $table->string('description');
            $table->integer('agenda_id')->unsigned();
            $table->foreign('agenda_id')
                ->references('id')
                ->on('a_agendas');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('a_users')
                ->onDelete('cascade'); // If user is deleted, delete activity
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('a_activities');
    }
}
