<?php

namespace CoreBundle\Generator;

/**
 * Description of Password
 */
class Password {
    
    /**
     * Hashes a password.
     * 
     * @param String $password
     * @return Array
     * [
     *   password => <string>
     *   salt => <string>
     * ]
     */
    public function generatePassword($password) {
        $hashGenerator = new Hash();
        $salt = $hashGenerator->generateSalt(32);
        $hashedPassword = $this->generatePasswordWithSalt($password, $salt);
        
        return [
            'password' => $hashedPassword,
            'salt' => $salt
        ];
    }
    
    /**
     * Generates a hash by a string and a salt
     * @param String $password
     * @param String $salt
     * @return String
     */
    public function generatePasswordWithSalt($password, $salt) {
        return md5($password . $salt);
    }
}
