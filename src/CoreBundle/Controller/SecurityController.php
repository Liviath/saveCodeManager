<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends Controller {
    
    /**
     * Checks if the user is logged in.
     * @return JsonResponse
     */
    public function securityAction() {
        return new JsonResponse(false);
    }
}
