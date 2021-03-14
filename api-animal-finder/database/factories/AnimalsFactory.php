<?php

namespace Database\Factories;

use App\Models\Animals;
use App\Models\AnimalOwner;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class AnimalsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Animals::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
			'age' => $this->faker->randomDigitNotNull,
			'photo' => 'http://lorempixel.com/800/600/animals/',
			'description' => $this->faker->text($maxNbChars = 450),
			'cityMissing' => $this->faker->city,
			'stateMissing' => $this->faker->state,
			'status' => $this->faker->randomElement($array = array ('perdido','comunicado','encontrado')),
			'guid' => $this->faker->uuid(),
			'created_at' => $this->faker->dateTime(),
			'updated_at' => $this->faker->dateTime(),
			'animal_owner_id' => 1
        ];
    }
}
