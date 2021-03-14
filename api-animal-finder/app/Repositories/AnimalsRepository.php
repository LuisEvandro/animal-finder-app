<?php

namespace App\Repositories;

use App\Interfaces\AnimalsInterface;
use App\Models\Animals;
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

}