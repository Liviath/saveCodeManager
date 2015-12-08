<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Yaml\Parser;

class ConfigController extends Controller {
    
    /**
     * Checks if the user is logged in.
     * @return JsonResponse
     */
    public function getConfigAction() {
        $path = $this->container->get('kernel')->locateResource('@CoreBundle/Resources/config/requirejs.yml');
        $content = file_get_contents($path);
        $yaml = new Parser();
        $contents = $yaml->parse($content);
        return new JsonResponse($contents);
    }
}
