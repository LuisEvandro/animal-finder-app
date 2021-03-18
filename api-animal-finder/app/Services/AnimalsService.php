<?php

namespace App\Services;

use App;

use DateTime;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Interfaces\AnimalsInterface;

use App\Interfaces\AnimalOwnerInterface;

use App\Models\Animals;

use App\Helpers\Helpers;

class AnimalsService
{
    protected $interface;
	protected $helpers;

    public function __construct(AnimalsInterface $animalsInterface,AnimalOwnerInterface $animalOwnerInterface, Helpers $helpers)
    {
        $this->interface = $animalsInterface;
		$this->interfaceOwner = $animalOwnerInterface;
        $this->helpers = $helpers;
    }

    public function CreateOrUpdateAnimal($guid = null, Request $request)
    {
        try {
			$error = null;
            $date = new DateTime();

			$Animal = new Animals;

			$Owner = $this->interfaceOwner->FindAnimalOwner($request->guidOwner);

			if($Owner != null){
				if($guid != null) {

					$Animal = $this->interface->FindAnimal($guid);

					$Animal->name = $request->name;
					$Animal->age = $request->age;
					$Animal->photo = $request->photo;
					$Animal->description = $request->description;
					$Animal->cityMissing = $request->cityMissing;
					$Animal->stateMissing = $request->stateMissing;
					$Animal->status = $request->status;
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
					$Animal->animal_owner_id = $Owner->id;
				}

				$Animal = $this->interface->SaveAnimal($Animal);

				if($Animal == false)
					$error = "Problema ao tentar salvar o animal. Tente novamente !";
			}else{
				$error = "Usúario para relacionamento não existe. Tente novamente !";
			}

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

	public function ShowAnimal($guid = null)
    {
        try {
			$error = null;
            $date = new DateTime();

            $Animal = $this->interface->FindAnimal($guid);

			if($Animal == false)
				$error = "O animal procurado não existe !";

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

	public function ListAnimals($page, $size, $search, $orderBy, $status)
    {
        try {
			$error = null;
            $date = new DateTime();

            $Animals = $this->interface->ListAnimals($page, $size, $search, $orderBy, $status);

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $Animals, $error), Response::HTTP_OK);
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

	public function DeleteAnimal($guid)
    {
        try {
			$error = null;

            $Animal = $this->interface->DeleteAnimal($guid);

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