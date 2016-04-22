<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddParkedToActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::table('a_activities', function (Blueprint $table) {
           $table->boolean('parked');
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
           $table->dropColumn('parked');
       });
     }
}
