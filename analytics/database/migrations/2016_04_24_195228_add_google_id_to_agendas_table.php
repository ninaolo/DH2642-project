<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGoogleIdToAgendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('a_agendas', function (Blueprint $table) {
            $table->string('google_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('a_agendas', function (Blueprint $table) {
            $table->dropColumn('google_id');
        });
    }
}
