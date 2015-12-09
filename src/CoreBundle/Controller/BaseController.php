<?php

namespace CoreBundle\Controller;

use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
        $resolvedContent = [];
        parse_str($content,$resolvedContent);
        return $resolvedContent;
    }
    
    /**
     * Gets the user id from the session
     * @param Request $request
     * @return Integer
     */
    protected function getUserId(Request $request) {
        return $request->getSession()->get('userId');
    }
    
    /**
     * Checks if the user is authentificated to perform an ection.
     * If not, a 404 header is sent back.
     * 
     * @param Request $request
     * @throws NotFoundHttpException
     */
    protected function requireAuthentificatedUser(Request $request) {
        $userId = $this->getUserId($request);
        if(!$userId) {
            throw new NotFoundHttpException('You need to be logged in to perform this action.');
        }
        return $userId;
    }
    
    protected function getInternalUser(Request $request) {
        $userId = $this->getUserId($request);
        return $userId ? $this->em->getRepository('CoreBundle:User')->find($userId) : null;
    }
}
