<?php

namespace CoreBundle\Controller;

use CoreBundle\Entity\User;
use CoreBundle\Generator\Password;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class UserController extends BaseController {
    
    /**
     * Creates a new user
     * @param Request $request
     * @return JsonResponse
     * @throws BadRequestHttpException
     */
    public function postAction(Request $request) {
        $data = $this->getParsedRequestContent($request);
        if(!isset($data['name']) || !isset($data['password'])) {
            throw new BadRequestHttpException('The parameter name or password is missing.');
        }
        if(!preg_match('/^[a-zA-Z0-9]{3,16}$/', $data['name'])) {
            throw new BadRequestHttpException('The parameter name does not match the pattern.');
        }
        if(!preg_match('/^.{6,32}$/', $data['password'])) {
            throw new BadRequestHttpException('The parameter password does not match the pattern.');
        }
        
        if($this->em->getRepository('CoreBundle:User')->findOneBy(['name' => $data['name']])) {
            $message = 'A user with this name allready exists.';
            return new JsonResponse($message, 200);
        }
        
        $passwordGenerator = new Password();
        $password = $passwordGenerator->generatePassword($data['password']);
        
        /* @var $user User */
        $user = new User();
        $user->setName($data['name']);
        $user->setPassword($password['password']);
        $user->setSalt($password['salt']);
        $this->em->persist($user);
        $this->em->flush();
        
        $request->getSession()->set('userId', $user->getId());
        return new JsonResponse(null, 204);
    }
    
    /**
     * Performs a login
     * @param Request $request
     * @return JsonResponse
     * @throws BadRequestHttpException
     */
    public function loginAction(Request $request) {
        $data = $this->getParsedRequestContent($request);
        if(!isset($data['name']) || !isset($data['password'])) {
            throw new BadRequestHttpException('The parameter name or password is missing.');
        }
        
        $passwordGenerator = new Password();
        
        if(!preg_match('/^.{3,16}$/', $data['name'])) {
            $message = 'The length of the username is invalid';
            return new JsonResponse($message, 200);
        }
        
        if(!preg_match('/^.{6,32}$/', $data['password'])) {
            $message = 'The length of the password is invalid';
            return new JsonResponse($message, 200);
        }
        
        $user = $this->em->getRepository('CoreBundle:User')->findOneBy(['name' => $data['name']]);
        if(!$user) {
            $message = 'The login credentials are invalid.';
            return new JsonResponse($message, 200);
        }
        
        $userSalt = $user->getSalt();
        
        $password = $passwordGenerator->generatePasswordWithSalt($data['password'], $userSalt);
        if($user->getPassword() !== $password) {
            $message = 'The login credentials are invalid.';
            return new JsonResponse($message, 200);
        }
        
        $request->getSession()->set('userId', $user->getId());
        return new JsonResponse(null, 204);
    }
    
    public function logoutAction(Request $request) {
        $request->getSession()->remove('userId');
        return new Response(null, 204);
    }
}
