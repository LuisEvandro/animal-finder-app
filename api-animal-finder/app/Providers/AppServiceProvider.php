<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

//Auth login
use App\Interfaces\AuthenticationInterface;

use App\Repositories\AuthenticationRepository;

//Animal Owner
use App\Interfaces\AnimalOwnerInterface;

use App\Repositories\AnimalOwnerRepository;

//Animal
use App\Interfaces\AnimalsInterface;

use App\Repositories\AnimalsRepository;

//Notification
use App\Interfaces\NotificationInterface;

use App\Repositories\NotificationRepository;

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

		$this->app->bind(AuthenticationInterface::class, AuthenticationRepository::class);

		$this->app->bind(NotificationInterface::class, NotificationRepository::class);
    }
}
