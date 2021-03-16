<?php

namespace App\Repositories;

use App\Interfaces\AnimalOwnerInterface;
use App\Models\AnimalOwner;
use App\Functions\Pagination;

use Illuminate\Support\Facades\DB;

class AnimalOwnerRepository implements AnimalOwnerInterface
{
    protected $model;

    public function __construct(AnimalOwner $Owner)
    {
        $this->model = $Owner;
    }

    /**
     * Salvar um novo dono ou atualizar um existente
     * 
     * @param Owner Dados do dono do animal
     * 
     * @return Owner
     */
    public function SaveAnimalOwner($Owner)
    {
        $Owner->save();

        return $Owner;
    }

	/**
     * Recupera os dados de um dono de animal
     * 
     * @param guid Guid do dono do animal
     * 
     * @return Owner
     */
    public function FindAnimalOwner($guid)
    {
		$Owner = AnimalOwner::where('guid', '=', $guid)->with('animals')->first();

        return $Owner;
    }

	/**
     * Recupera uma lista de donos de animal.
     * 
     * @param page Pagina
     * @param size Quantidade de itens na pagina
     * @param search Palavra para filtrar a lista, essa palavra sera usada nos campos de nome e e-mail
     * @param orderBy Forma de ordenação da lista diferente da padrão que é por id
     * 
     * @return Array
     */
    public function ListAnimalOwner($page, $size, $search, $orderBy)
    {
		$data = AnimalOwner::where('name', 'LIKE', "%{$search}%")
							->orWhere('email', 'LIKE', "%{$search}%")
							->with('animals');

		$count = $data->count();
        $items = $data->skip(($page - 1) * $size)->take($size)->orderBy('id', $orderBy)->get();

        return Pagination::Paginate($items, $count, $page, $size);
    }

	/**
     * Deleta um dono de animal de acordo com o guid passado por param.
     * 
     * @param guid Guid do dono do animal
     * 
     * @return OwnerInfo
     */
    public function DeleteAnimalOwner($guid)
    {
		$Owner = AnimalOwner::where('guid', '=', $guid)->first();

		if($Owner != null){
			$OwnerInfo = $Owner->delete();
		}else{
			$OwnerInfo = false;
		}

        return $OwnerInfo;
    }

}