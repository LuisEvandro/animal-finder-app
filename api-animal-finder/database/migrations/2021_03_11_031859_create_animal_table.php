<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
			$table->string('name', 100);
			$table->string('age', 3);
			$table->string('photo', 150)->nullable();
			$table->string('description',500);
			$table->string('cityMissing', 100);
			$table->string('stateMissing',100);
			$table->enum('status', ['perdido','comunicado','encontrado'])->default('perdido');
			$table->string('guid',55)->unique();
            $table->dateTime('created_at');
			$table->dateTime('updated_at');
			$table->foreignId('animal_owner_id')->constrained('animal_owner');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animals');
    }
}
