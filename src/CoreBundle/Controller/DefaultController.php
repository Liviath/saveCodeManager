<?php

namespace CoreBundle\Controller;

use CoreBundle\Utils\RecursiveFileNameReader;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {
    
    public function indexAction() {
        $fileReader = new RecursiveFileNameReader();
        $files = $fileReader->getFiles('/css', 'css/');
        return $this->render('CoreBundle:default:index.html.twig', [
            'files' => $files
        ]);
    }
}
