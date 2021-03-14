<?php

namespace App\Http\Controllers;

use App\Services\AnimalsService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnimalsController extends Controller
{
	private $service;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AnimalsService $animal)
    {
        $this->service = $animal;
    }

    /**
     * Método que criará um novo animal ou atualizará um já existente dada a passagem de um "guid"
     * @method POST
     * 
     * @param String $guid --> "guid" do animal que deve ser atualizado, caso nulo criará um novo animal.
     * @param Request $request JSON que conterá todos os dados do animal a ser criado ou atualizado
     * 
     * @return JsonResponse
     */
    public function CreateAnimal($guid = null, Request $request)
    {
        return $this->service->CreateAnimal($guid, $request);
    }
}
