<?php

namespace App\Repositories;

use App\Interfaces\AuthenticationInterface;
use App\Models\AnimalOwner;
use App\Models\Token;
use App\Functions\Pagination;

use DateTime;

use Illuminate\Support\Facades\DB;

class AuthenticationRepository implements AuthenticationInterface
{
    protected $model;

    public function __construct(AnimalOwner $User)
    {
        $this->model = $User;
    }

    /**
     * Realiza o login do usuario "Dono do animal"
     * 
     * @param email E-mail do AnimalOwner
	 * @param token Salvar token
     * 
     * @return Boolean
     */
    public function Login($email, $token)
    {
        $date = new DateTime();
		$userData = AnimalOwner::where('email', '=', $email)->first();

		$tokenExist = Token::where('token', '=', $token->token)->where('expiresIn', '>', $date)->first();

		if($userData != null){
			if($tokenExist == null){
				$token->idOwner = $userData->id;
				$token->save();
				$userData->token = $token;
			}else{
				$userData->token = $tokenExist;
			}
		}

		return $userData;
    }

}