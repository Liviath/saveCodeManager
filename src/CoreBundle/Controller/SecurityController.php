<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends Controller {
    
    /**
     * Checks if the user is logged in.
     * @return JsonResponse
     */
    public function securityAction(\Symfony\Component\HttpFoundation\Request $request) {
        return new JsonResponse($request->getSession()->get('userId') ? true : false);
    }
}
