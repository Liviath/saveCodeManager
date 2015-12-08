<?php

namespace CoreBundle\Generator;

class Hash {
    
    /**
     * Generates a random salt
     * @param Integer $length
     * @return String
     */
    public function generateSalt($length = 32) {
        $salt = '';
        for($i = 0; $i < $length; $i++) {
            $min = 0;
            $max = 0;
            switch(mt_rand(0, 2)) {
                case 0:
                    $min = 48;
                    $max = 57;
                    break;
                case 1:
                    $min = 65;
                    $max = 90;
                    break;
                case 2:
                    $min = 97;
                    $max = 122;
            }
            $salt .= chr(mt_rand($min, $max));
        }
        return $salt;
    }
}