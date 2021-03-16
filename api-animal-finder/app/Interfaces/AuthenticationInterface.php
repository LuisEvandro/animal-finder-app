<?php

namespace App\Interfaces;

interface AuthenticationInterface
{
    public function Login($email,$token);
}
