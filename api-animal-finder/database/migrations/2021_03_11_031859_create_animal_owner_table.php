<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalOwnerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animal_owner', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
			$table->string('name', 100);
			$table->string('email',100)->unique();
			$table->string('phone', 16);
			$table->string('password', 100);
			$table->string('guid',55)->unique();
            $table->dateTime('created_at');
			$table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animal_owner');
    }
}
