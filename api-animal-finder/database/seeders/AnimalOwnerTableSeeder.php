<?php

namespace Database\Seeders;

use App\Models\AnimalOwner;
use Illuminate\Database\Seeder;

class AnimalOwnerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		AnimalOwner::factory()
					->count(2)
					->create();
    }
}
