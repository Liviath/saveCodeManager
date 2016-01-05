<?php

namespace CoreBundle\Entity;

/**
 * Code
 */
class Code
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
    private $gameId;

    /**
     * @var string
     */
    private $codeOne;

    /**
     * @var string
     */
    private $codeTwo;

    /**
     * @var \CoreBundle\Entity\Game
     */
    private $game;


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
     * @return Code
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
     * Set gameId
     *
     * @param integer $gameId
     *
     * @return Code
     */
    public function setGameId($gameId)
    {
        $this->gameId = $gameId;

        return $this;
    }

    /**
     * Get gameId
     *
     * @return integer
     */
    public function getGameId()
    {
        return $this->gameId;
    }

    /**
     * Set codeOne
     *
     * @param string $codeOne
     *
     * @return Code
     */
    public function setCodeOne($codeOne)
    {
        $this->codeOne = $codeOne;

        return $this;
    }

    /**
     * Get codeOne
     *
     * @return string
     */
    public function getCodeOne()
    {
        return $this->codeOne;
    }

    /**
     * Set codeTwo
     *
     * @param string $codeTwo
     *
     * @return Code
     */
    public function setCodeTwo($codeTwo)
    {
        $this->codeTwo = $codeTwo;

        return $this;
    }

    /**
     * Get codeTwo
     *
     * @return string
     */
    public function getCodeTwo()
    {
        return $this->codeTwo;
    }

    /**
     * Set game
     *
     * @param \CoreBundle\Entity\Game $game
     *
     * @return Code
     */
    public function setGame(\CoreBundle\Entity\Game $game = null)
    {
        $this->game = $game;

        return $this;
    }

    /**
     * Get game
     *
     * @return \CoreBundle\Entity\Game
     */
    public function getGame()
    {
        return $this->game;
    }
    /**
     * @var string
     */
    private $description;

    /**
     * @var string
     */
    private $code;


    /**
     * Set description
     *
     * @param string $description
     *
     * @return Code
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set code
     *
     * @param string $code
     *
     * @return Code
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }
    /**
     * @var integer
     */
    private $orderVal;


    /**
     * Set orderVal
     *
     * @param integer $orderVal
     *
     * @return Code
     */
    public function setOrderVal($orderVal)
    {
        $this->orderVal = $orderVal;

        return $this;
    }

    /**
     * Get orderVal
     *
     * @return integer
     */
    public function getOrderVal()
    {
        return $this->orderVal;
    }
}
