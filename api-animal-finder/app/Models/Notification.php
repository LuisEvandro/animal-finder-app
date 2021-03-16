<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class Notification extends Model
{
	use Authenticatable, Authorizable, HasFactory;

    protected $table = 'notification';

    protected $primaryKey = 'id';
    
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'phone',
        'description',
		'animal_id'
    ];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
		'id',
		'animal_id'
    ];

    public function animal()
    {
        return $this->hasMany('App\Models\Animals', 'id', 'animal_id');
    }
}
