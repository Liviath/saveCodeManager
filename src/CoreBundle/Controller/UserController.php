<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller {
    
    public function postAction(Request $request) {
        $data = $request->getContent();
        return new JsonResponse($data);
    }
}
