<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

//Animal Owner
use App\Interfaces\AnimalOwnerInterface;

use App\Repositories\AnimalOwnerRepository;

//Animal
use App\Interfaces\AnimalsInterface;

use App\Repositories\AnimalsRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AnimalOwnerInterface::class, AnimalOwnerRepository::class);

		$this->app->bind(AnimalsInterface::class, AnimalsRepository::class);
    }
}
