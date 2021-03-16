<?php

namespace Database\Seeders;

use App\Models\Token;
use Illuminate\Database\Seeder;

class TokenTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		Token::factory()
				->count(2)
				->create();
    }
}
