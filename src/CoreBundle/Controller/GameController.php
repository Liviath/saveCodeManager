<?php

namespace CoreBundle\Controller;

use CoreBundle\Entity\Game;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class GameController extends BaseController {
    
    /**
     * Creates a new game
     * @param Request $request
     * @return Response
     */
    public function postAction(Request $request) {
        $userId = $this->requireAuthentificatedUser($request);
        $data = $this->getParsedRequestContent($request);
        if(strlen($data['name']) < 2) {
            throw new BadRequestHttpException('The length of the game name to be created is less then 2');
        }
        
        if($this->em->getRepository('CoreBundle:Game')->findBy([
            'name' => $data['name'],
            'userId' => $userId])) {
            return new Response('You allready have a game with this name.');
        }
        
        $user = $this->getInternalUser($request);
        $game = new Game();
        $game->setName($data['name']);
        $game->setUserId($userId);
        $game->setUser($user);
        $game->setAmountOfSaveCodes($data['amountOfSaveCodes']);
        $this->em->persist($game);
        $this->em->flush();
        
        return new Response(null, 204);
    }
    
    /**
     * Gets the data for the game view
     * @param Request $request
     */
    public function getAction(Request $request) {
        $userId = $this->requireAuthentificatedUser($request);
        $gameRepo = $this->em->getRepository('CoreBundle:Game');
        $data = $gameRepo->getAllGamesByUserId($userId);
        return new JsonResponse($data);
    }
}
