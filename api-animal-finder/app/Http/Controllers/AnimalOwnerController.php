<?php

namespace App\Http\Controllers;

use App\Services\AnimalOwnerService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnimalOwnerController extends Controller
{
	private $service;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AnimalOwnerService $animalOwner)
    {
        $this->service = $animalOwner;
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
        return $this->service->CreateAnimalOwner($guid, $request);
    }

	/**
     * Método que retorna os dados de um dono de animal de acordo com o "guid" passado no param
     * @method GET
     * 
     * @param String $guid --> "guid" do dono de animal que deve ser retornado.
     * @param Request $request JSON que conterá todos os dados do dono de animal.
     * 
     * @return JsonResponse
     */
    public function ShowAnimalOwner($guid = null)
    {
        return $this->service->ShowAnimalOwner($guid);
    }

	/**
     * Método que retorna lista de dados de um dono de animal de acordo com os param de busca
     * @method POST
     * $page, $size, $search, $orderBy
     * @param Number $page --> Número da pagina.
	 * @param Number $size --> Quantidade de dados no retorno da pagina.
	 * @param String $search --> Texto de procura dentro dos campos nome, email.
	 * @param String $orderBy --> Formato da ordenação da lista.
     * 
     * @return JsonResponse
     */
    public function ListAnimalOwner(Request $request)
    {
        return $this->service->ListAnimalOwner($request->page, $request->size, $request->search, $request->orderBy);
    }

	/**
     * Método que deleta os dados de um dono de animal de acordo com o "guid" passado no param
     * @method DELETE
     * 
     * @param String $guid --> "guid" do dono de animal que deve ser deletado.
     * 
     * @return JsonResponse
     */
	public function DeleteAnimalOwner($guid = null)
    {
        return $this->service->DeleteAnimalOwner($guid);
    }
}
