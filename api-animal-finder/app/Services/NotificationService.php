<?php

namespace App\Services;

use App;

use DateTime;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Interfaces\NotificationInterface;
use App\Interfaces\AnimalsInterface;

use App\Models\Notification;
use App\Models\Animals;

use App\Helpers\Helpers;

class NotificationService
{
    protected $interface;
	protected $helpers;

    public function __construct(NotificationInterface $notificationInterface, AnimalsInterface $animalInterface, Helpers $helpers)
    {
        $this->interface = $notificationInterface;
		$this->interfaceAnimal = $animalInterface;
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

	public function CreateNotification($request)
    {
        try {
			$error = null;
            $date = new DateTime();
			
			$notification = new Notification;
			$Animal = new Animals;

			$Animal = $this->interfaceAnimal->FindAnimal($request->animalGuid);
			
			if($Animal == null){
				$error = 'Problema ao inserir a notificação, tente novamente !';
			}else{
				$notification = $this->interface->CreateNotification($request);
				
				if($notification == null){
					$notification = null;
					$error = 'Problema ao inserir a notificação, tente novamente !';
				}else{
					$Animal->status = 'comunicado';
					$Animal = $this->interfaceAnimal->SaveAnimal($Animal);
				}
			}

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $notification, $error), Response::HTTP_OK);
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