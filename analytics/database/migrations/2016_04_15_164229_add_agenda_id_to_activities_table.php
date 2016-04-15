<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAgendaIdToActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('a_activities', function (Blueprint $table) {

          $table->integer('agenda_id')->unsigned();

          $table->foreign('agenda_id')
                ->references('id')
                ->on('a_agendas');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('a_activities', function (Blueprint $table) {
          $table->dropColumn('agenda_id');
      });
    }
}
