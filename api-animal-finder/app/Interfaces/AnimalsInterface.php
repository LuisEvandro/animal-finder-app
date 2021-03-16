<?php

namespace App\Interfaces;

interface AnimalsInterface
{
    public function SaveAnimal($Animal);

	public function FindAnimal($guid);

	public function ListAnimals($page, $size, $search, $orderBy);

	public function DeleteAnimal($guid);

}
