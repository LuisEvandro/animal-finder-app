<?php

namespace App\Http\Controllers;

use App\Services\AuthenticationService;
use App\Services\AnimalOwnerService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    private $service;
    private $userService;

    public function __construct(AuthenticationService $authenticationService, AnimalOwnerService $user)
    {
        $this->service = $authenticationService;
        $this->userService = $user;
    }

    public function Login(Request $request)
    {
        return $this->service->Login($request);
    }

	/**
     * Método que criará um novo dono de animal ou atualizará um já existente dada a passagem de um "guid"
     * @method POST
     * 
     * @param String $guid --> "guid" do dono de animal que deve ser atualizado, caso nulo criará um novo dono de animal.
     * @param Request $request JSON que conterá todos os dados do dono de animal a ser criado ou atualizado
     * 
     * @return JsonResponse
     */
    public function CreateAnimalOwner($guid = null, Request $request)
    {
        return $this->userService->CreateAnimalOwner($guid, $request);
    }

    //public function Logout(Request $request)
    //{
    //    return $this->service->Logout($request);
    //}
}
