<?php

namespace App\Repositories;

use App\Interfaces\AnimalsInterface;
use App\Models\Animals;
use App\Models\AnimalOwner;
use App\Functions\Pagination;

use Illuminate\Support\Facades\DB;

class AnimalsRepository implements AnimalsInterface
{
    protected $model;

    public function __construct(Animals $Animal)
    {
        $this->model = $Animal;
    }

    /**
     * Salvar um novo animal ou atualizar um existente
     * 
     * @param Animal Dados do animal
     * 
     * @return Animal
     */
    public function SaveAnimal($Animal)
    {
        $Animal->save();

        return $Animal;
    }

	/**
     * Busca os dados de um animal por guid
     * 
     * @param guid Guid do animal
     * 
     * @return Animal
     */
    public function FindAnimal($guid)
    {
        $Animal = Animals::where('guid', '=', $guid)->with('owner')->first();

        return $Animal;
    }

	/**
     * Recupera uma lista de animal.
     * 
     * @param page Pagina
     * @param size Quantidade de itens na pagina
     * @param search Palavra para filtrar a lista, essa palavra sera usada nos campos de nome e e-mail
     * @param orderBy Forma de ordenação da lista diferente da padrão que é por id
     * 
     * @return Array
     */
    public function ListAnimals($page, $size, $search, $orderBy)
	{
		$data = Animals::where('name', 'LIKE', "%{$search}%")
						->orWhere('cityMissing', 'LIKE', "%{$search}%")
						->orWhere('stateMissing', 'LIKE', "%{$search}%")
						->orWhere('status', 'LIKE', "%{$search}%")
						->with('owner');

		$count = $data->count();
        $items = $data->skip(($page - 1) * $size)->take($size)->orderBy('id', $orderBy)->get();

        return Pagination::Paginate($items, $count, $page, $size);
	}

	/**
     * Deleta um animal de acordo com o guid passado por param.
     * 
     * @param guid Guid do animal
     * 
     * @return AnimalInfo
     */
    public function DeleteAnimal($guid)
    {
		$Animal = Animals::where('guid', '=', $guid)->first();

		if($Animal != null){
			$AnimalInfo = $Animal->delete();
		}else{
			$AnimalInfo = false;
		}

        return $AnimalInfo;
    }

}