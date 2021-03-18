<?php

namespace App\Interfaces;

interface NotificationInterface
{
    public function ListNotifications($guid, $request);

	public function CreateNotification($request);

}
