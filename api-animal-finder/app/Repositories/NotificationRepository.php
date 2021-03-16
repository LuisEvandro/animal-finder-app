<?php

namespace App\Repositories;

use App\Interfaces\NotificationInterface;

use App\Models\Notification;
use App\Models\Animals;

use App\Functions\Pagination;

use Illuminate\Support\Facades\DB;

class NotificationRepository implements NotificationInterface
{
    protected $model;

    public function __construct(Notification $Notification)
    {
        $this->model = $Notification;
    }

    /**
     * Retorna as informações
     * 
     * @param guid guid do animal
     * 
     * @return Array
     */
    public function ListNotifications($guid, $request)
    {

		$Animal = Animals::where('guid', '=', $guid)->first();

		if($Animal != null){

			$data = Notification::where('animal_id', '=', $Animal->id)->with('animal');

			$count = $data->count();
        	$items = $data->skip(($request->page - 1) * $request->size)->take($request->size)->orderBy('id', $request->orderBy)->get();

		}else{
			return false;
		}

		return $items;
    }

}