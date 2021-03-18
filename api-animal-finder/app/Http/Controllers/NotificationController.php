<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    private $service;
    private $userService;

    public function __construct(NotificationService $notificationService)
    {
        $this->service = $notificationService;
    }

    public function ListNotifications($guid = null, Request $request)
    {
        return $this->service->ListNotifications($guid, $request);
    }

	public function CreateNotification(Request $request)
    {
        return $this->service->CreateNotification($request);
    }
}
