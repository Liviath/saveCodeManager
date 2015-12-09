<?php

namespace CoreBundle\Entity;

/**
 * Game
 */
class Game
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var integer
     */
    private $userId;

    /**
     * @var string
     */
    private $amountOfSaveCodes;

    /**
     * @var \CoreBundle\Entity\User
     */
    private $user;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Game
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return Game
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set amountOfSaveCodes
     *
     * @param string $amountOfSaveCodes
     *
     * @return Game
     */
    public function setAmountOfSaveCodes($amountOfSaveCodes)
    {
        $this->amountOfSaveCodes = $amountOfSaveCodes;

        return $this;
    }

    /**
     * Get amountOfSaveCodes
     *
     * @return string
     */
    public function getAmountOfSaveCodes()
    {
        return $this->amountOfSaveCodes;
    }

    /**
     * Set user
     *
     * @param \CoreBundle\Entity\User $user
     *
     * @return Game
     */
    public function setUser(\CoreBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \CoreBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
