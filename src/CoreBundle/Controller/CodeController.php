<?php

namespace CoreBundle\Controller;

use CoreBundle\Entity\Game;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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
        
        $game = $this->em->getRepository('CoreBundle:Game')->find($data['gameId']);
        $code = new \CoreBundle\Entity\Code();
        $code->setDescription($data['description']);
        $code->setCode($data['code']);
        $code->setGameId($game->getId());
        $code->setGame($game);
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
}
