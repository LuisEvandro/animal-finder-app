<?php

namespace App\Services;

use App;

use DateTime;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Interfaces\AuthenticationInterface;

use App\Models\AnimalOwner;
use App\Models\Token;

use App\Helpers\Helpers;

class AuthenticationService
{
    protected $interface;
	protected $helpers;

    public function __construct(AuthenticationInterface $authenticationInterface, Helpers $helpers)
    {
        $this->interface = $authenticationInterface;
        $this->helpers = $helpers;
    }

    public function Login(Request $request)
    {
        try {
			$error = null;
            $date = new DateTime();
			$userData = new AnimalOwner;

			$token = new Token ([
                "token" => $this->helpers->GenereteGuid(),
                "expiresIn" => $date->modify('+ 1 hour')->format("Y-m-d H:i:s")
            ]);

			$userData = $this->interface->Login($request->email, $token);

			if($userData != null && $userData != false){
				$password = $userData->password;

				if(password_verify($request->pass, $password)){
					$userData;
				}else{
					$userData = null;
					$error = "Senha incorreta !";
				}
			}else{
				$error = "Usúario não encontrado !";
			}

            return response()->json($this->helpers->generateReponse(Response::HTTP_OK, "OK", $userData, $error), Response::HTTP_OK);
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