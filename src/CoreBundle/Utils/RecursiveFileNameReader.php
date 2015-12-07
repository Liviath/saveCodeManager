<?php

namespace CoreBundle\Utils;

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class RecursiveFileNameReader {
    
    /**
     * Get all files in a certain directory
     * 
     * @param type $path
     * @return type
     */
    public function getFiles($path, $prefix = '') {
        $path = $_SERVER['DOCUMENT_ROOT'] . $path;
        $objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveDirectoryIterator::SKIP_DOTS);
        $fileNames = [];
        foreach($objects as $path => $object){
            $name = $object->getFileName();
            if($name !== '.' && $name !== '..') {
                $fileNames []= $prefix . $name;
            }
        }
        return $fileNames;
    }
}
