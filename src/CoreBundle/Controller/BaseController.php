<?php

namespace CoreBundle\Controller;

use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Abstract class with functions alot of controller need.
 */
abstract class BaseController extends Controller {
    
    /**
     * @var EntityManager
     */
    protected $em;
    
    /**
     * @inheritDoc
     */
    public function setContainer(ContainerInterface $container = null) {
        parent::setContainer($container);
        $this->em = $this->getDoctrine()->getManager();
    }
    
    /**
     * Parses the request content, returns an assositive array with the id of the parameter as id
     * 
     * @param Request $request
     * @return Array
     */
    protected function getParsedRequestContent(Request $request) {
        $content = $request->getContent();
        $splittedContent = split('&', $content);
        $resolvedContent = [];
        foreach ($splittedContent as $parameter) {
            $parameter = split('=', $parameter);
            $resolvedContent[$parameter[0]] = $parameter[1];
        }
        return $resolvedContent;
    }
}
