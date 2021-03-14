<?php

namespace Database\Seeders;

use App\Models\Animals;
use Illuminate\Database\Seeder;

class AnimalsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		Animals::factory()
				->count(1)
				->create();
    }
}
