<?php

namespace App\Services;

use App;

use DateTime;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Interfaces\AnimalsInterface;

use App\Models\Animals;

use App\Helpers\Helpers;

class AnimalsService
{
    protected $interface;
	protected $helpers;

    public function __construct(AnimalsInterface $animalsInterface, Helpers $helpers)
    {
        $this->interface = $animalsInterface;
        $this->helpers = $helpers;
    }

    public function CreateAnimal($guid = null, Request $request)
    {
        try {
			$error = null;
            $date = new DateTime();

			$Animal = new Animals;

            if($guid != null) {
				$Animal->updated_at = $date->format("Y-m-d H:i:s");
            } else {
				$Animal->name = $request->name;
				$Animal->age = $request->age;
				$Animal->photo = $request->photo;
				$Animal->description = $request->description;
				$Animal->cityMissing = $request->cityMissing;
				$Animal->stateMissing = $request->stateMissing;
				$Animal->status = $request->status;
				$Animal->guid = $this->helpers->GenereteGuid();
                $Animal->created_at = $date->format("Y-m-d H:i:s");
                $Animal->updated_at = $date->format("Y-m-d H:i:s");
				//FK Animal Owner
				$Animal->animal_owner_id = $request->OwnerId;
            }

            //$Animal = $this->interface->SaveAnimal($Animal);

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $Animal, $error), Response::HTTP_OK);
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