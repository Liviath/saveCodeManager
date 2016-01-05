<?php

namespace CoreBundle\Controller;

use CoreBundle\Entity\Code;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CodeController extends BaseController {
    
    /**
     * Adds a code
     * @param Request $request
     * @return Response
     */
    public function postAction(Request $request) {
        $this->requireAuthentificatedUser($request);
        $data = $this->getParsedRequestContent($request);
        if(strlen($data['code']) < 2) {
            throw new BadRequestHttpException('The length of the code is less then 2');
        }
        
        $codeRepo = $this->em->getRepository('CoreBundle:Code');
        $game = $this->em->getRepository('CoreBundle:Game')->find($data['gameId']);
        $code = new Code();
        $orderVal = $codeRepo->getLastOrderValByGame($game->getId()) + 1;
        $code->setDescription($data['description']);
        $code->setCode($data['code']);
        $code->setGameId($game->getId());
        $code->setGame($game);
        $code->setOrderVal($orderVal);
        $this->em->persist($code);
        $this->em->flush();
        
        return new Response(null, 204);
    }
    
    /**
     * Gets the data for the game view
     * @param Request $request
     */
    public function getAction(Request $request) {
        $this->requireAuthentificatedUser($request);
        $gameId = $request->query->get('gameId');
        $codeRepo = $this->em->getRepository('CoreBundle:Code');
        $data = $codeRepo->getAllCodesByGame($gameId);
        return new JsonResponse($data);
    }
    
    /**
     * 
     * @param Request $request
     * @param String $codeId
     */
    public function changeAction(Request $request, $codeId) {
        $userId = $this->requireAuthentificatedUser($request);
        $requestData = $this->getParsedRequestContent($request);
        $code = $this->em->getRepository('CoreBundle:Code')->find($codeId);
        if(!$code || $code->getGame()->getUser()->getId() !== $userId) {
            throw new NotFoundHttpException('Code doesnt exists');
        }
        if(strlen($requestData['description']) === 0) {
            $this->em->remove($code);
        } else {
            $code->setDescription($requestData['description']);
            $code->setCode($requestData['code']);
        }
        $this->em->flush();
        return new JsonResponse(null, 204);
    }
    
    /**
     * 
     * @param Request $request
     * @param String $codeId
     */
    public function moveAction(Request $request, $codeId) {
        $userId = $this->requireAuthentificatedUser($request);
        $codeRepo = $this->em->getRepository('CoreBundle:Code');
        $code = $codeRepo->find($codeId);
        if(!$code || $code->getGame()->getUser()->getId() !== $userId) {
            throw new NotFoundHttpException('Code doesnt exists');
        }
        
        $orderVal = $code->getOrderVal();
        if ($orderVal > 1) {
            $codeRepo->moveUp($code->getOrderVal());
        }
        return new JsonResponse(null, 204);
    }
}
