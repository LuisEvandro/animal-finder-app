<?php

namespace App\Services;

use App;

use DateTime;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Interfaces\NotificationInterface;

use App\Models\Notification;
use App\Models\Animals;

use App\Helpers\Helpers;

class NotificationService
{
    protected $interface;
	protected $helpers;

    public function __construct(NotificationInterface $notificationInterface, Helpers $helpers)
    {
        $this->interface = $notificationInterface;
        $this->helpers = $helpers;
    }

    public function ListNotifications($guid, $request)
    {
        try {
			$error = null;
            $date = new DateTime();
			
			$notifications = new Notification;

			$notifications = $this->interface->ListNotifications($guid, $request);

			if($notifications == null){
				$notifications = null;
				$error = 'Problema ao localizar as notificações, tente novamente !';
			}

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $notifications, $error), Response::HTTP_OK);
        } catch (\Exception $ex) {
            $exception = [
                'Code' => $ex->getCode(),
                'Message' => $ex->getMessage(),
                'Trace' => $ex->getTraceAsString(),
                'File' => $ex->getFile(),
                'Line' => $ex->getLine(),
                'Exception' => $ex->__toString()
            ];            

            return response()->json($this->helpers->generateReponse(Response::HTTP_INTERNAL_SERVER_ERROR, "ERROR", null, $exception), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}