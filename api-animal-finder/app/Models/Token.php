<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'Token';

    protected $primaryKey = 'Id';
    
    public $timestamps = false;

    protected $fillable = [
        'id',
        'idOwner',
        'token',
        'expiresIn'
    ];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
		'id'
    ];

    public function usuario()
    {
        return $this->belongsTo('App\Models\AnimalOwner', 'id', 'idOwner');
    }
}