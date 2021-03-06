<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

use App\Models\Token;
use DateTime;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
	*/
    public function handle($request, Closure $next, $guard = null)
    {
		$date = new DateTime();

        if(!$request->header('Authorization')) 
			return response()->json(['error' => 'Unauthorized'], 401);

		if($request->header('Authorization') == env('TOKEN')) 
			return $next(env('TOKEN'));

		$token = $request->header('Authorization');
        $validateToken = Token::where('token', '=', $token)->where('expiresIn', '>', $date)->first();

		if($validateToken == null)
            return response()->json(['error' => 'Unauthorized'], 401);

        return $next($validateToken);
    }
}
