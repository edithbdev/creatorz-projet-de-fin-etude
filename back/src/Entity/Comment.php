<?php

namespace App\Entity;

use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user_current", "user_browse","user_read", "comment_read", "comment_browse"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"user_browse","user_read","user_current", "comment_read", "comment_browse"})
     */
    private $body;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"user_current", "user_browse","user_read", "comment_read", "comment_browse"})
     */
    private $publishedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"user_current", "comment_browse"})
     */
    private $user;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="commentsReceived")
     * @Groups({"comment_browse", "comment_read"})
     */
    private $userReceived;

    public function getId()
    {
        return $this->id;
    }

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->publishedAt = new \DateTime();
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(\DateTimeInterface $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUserReceived(): ?User
    {
        return $this->userReceived;
    }

    public function setUserReceived(?User $userReceived): self
    {
        $this->userReceived = $userReceived;

        return $this;
    }

}
