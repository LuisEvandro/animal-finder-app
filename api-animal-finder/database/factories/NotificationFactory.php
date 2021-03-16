<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\Animals;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
			'phone' => '(14) 99947-4577',
			'description' => $this->faker->text($maxNbChars = 450),
			'animal_id' => Animals::factory()
        ];
    }
}
