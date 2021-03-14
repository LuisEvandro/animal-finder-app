<?php

namespace App\Interfaces;

interface AnimalOwnerInterface
{
    public function SaveAnimalOwner($Owner);

	public function FindAnimalOwner($guid);

	public function ListAnimalOwner($page, $size, $search, $orderBy);

	public function DeleteAnimalOwner($guid);
}
