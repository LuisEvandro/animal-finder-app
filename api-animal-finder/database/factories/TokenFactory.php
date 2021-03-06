<?php

namespace Database\Factories;

use App\Models\Token;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class TokenFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Token::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'idOwner' => $this->faker->randomDigitNotNull,
			'token' => $this->faker->uuid(),
			'expiresIn' => $this->faker->dateTimeBetween('this week', '+6 days')
        ];
    }
}
