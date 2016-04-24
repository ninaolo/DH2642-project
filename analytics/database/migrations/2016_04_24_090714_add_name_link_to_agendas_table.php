<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNameLinkToAgendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::table('a_agendas', function (Blueprint $table) {
           $table->string('name');
           $table->string('link');
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
           $table->dropColumn('name');
           $table->dropColumn('link');
       });
     }
}
