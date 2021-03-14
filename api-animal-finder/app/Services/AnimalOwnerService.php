<?php

namespace App\Services;

use App;

use DateTime;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Interfaces\AnimalOwnerInterface;

use App\Models\AnimalOwner;

use App\Helpers\Helpers;

class AnimalOwnerService
{
    protected $interface;
	protected $helpers;

    public function __construct(AnimalOwnerInterface $animalOwnerInterface, Helpers $helpers)
    {
        $this->interface = $animalOwnerInterface;
        $this->helpers = $helpers;
    }

    public function CreateAnimalOwner($guid = null, Request $request)
    {
        try {
            $date = new DateTime();

            $Owner = ($guid != null) ? $this->interface->FindAnimalOwner($guid) : new AnimalOwner;

            if($guid != null) {
				$Owner->name = $request->name;
				$Owner->email = $request->email;
				$Owner->phone = $request->phone;
				//Encrypt password if exists
				if($request->password){
					$Owner->password = Hash::make($request->password);
				}
				$Owner->updated_at = $date->format("Y-m-d H:i:s");
            } else {
				$Owner->name = $request->name;
				$Owner->email = $request->email;
				$Owner->phone = $request->phone;
				$Owner->password = Hash::make($request->password);
				$Owner->guid = $this->helpers->GenereteGuid();
                $Owner->created_at = $date->format("Y-m-d H:i:s");
                $Owner->updated_at = $date->format("Y-m-d H:i:s");
            }

            $Owner = $this->interface->SaveAnimalOwner($Owner);

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $Owner, null), Response::HTTP_OK);
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

	public function ShowAnimalOwner($guid = null)
    {
        try {
			$error = null;
			$Owner = new AnimalOwner;

			$Owner = $this->interface->FindAnimalOwner($guid);

			if($guid == null) {
				$error = "Guid não especificado !";
            }

			if($Owner == null){
				$error = "Usúario não encontrado !";
			}

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $Owner, $error), Response::HTTP_OK);
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

	public function ListAnimalOwner($page, $size, $search, $orderBy)
    {
        try {
			$error = null;
			$Owners = new AnimalOwner;

			$Owners = $this->interface->ListAnimalOwner($page, $size, $search, $orderBy);

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $Owners, $error), Response::HTTP_OK);
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

	public function DeleteAnimalOwner($guid)
    {
        try {
			$error = null;

			$delete = $this->interface->DeleteAnimalOwner($guid);

			if(!$delete){
				$error = "Usúario não encontrado para deleção";
			}

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $delete, $error), Response::HTTP_OK);
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