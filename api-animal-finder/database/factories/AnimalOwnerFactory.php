<?php

namespace Database\Factories;

use App\Models\AnimalOwner;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class AnimalOwnerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AnimalOwner::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
			'email' => $this->faker->unique()->safeEmail,
			'phone' => "(14) 99999-0000",
			'password' => Hash::make('123456'),
			'guid' => $this->faker->uuid(),
			'created_at' => $this->faker->dateTime(),
			'updated_at' => $this->faker->dateTime()
        ];
    }
}
