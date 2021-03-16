<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

use App\Models\AnimalOwner;

class Animals extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

	protected $table = 'animals';
	protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		'id',
        'name',
		'age',
		'photo',
		'description',
		'cityMissing',
		'stateMissing',
		'status',
		'guid',
		'created_at',
		'updated_at',
		'animal_owner_id'
    ];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
		'id',
		'animal_owner_id'
    ];

    public function owner() 
    {
        return $this->hasOne('App\Models\AnimalOwner', 'id', 'animal_owner_id');
    }

	public function notification()
    {
        return $this->hasOne('App\Models\Notification', 'id', 'id');
    }
}
