<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user_browse","user_read","user_current"})
     * @Groups({"category_browse","category_read"})
     *
     */
    private $id;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_browse","user_read"})
     * @Groups({"category_browse","category_read", "user_current"})
    */
    private $category_name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"category_browse","category_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"category_browse","category_read"})
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Gedmo\Slug(fields={"category_name"})
     * @Groups({"category_browse","category_read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"category_browse","category_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="category")
     * @Groups({"category_browse"})
     */
    private $users;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategoryName(): ?string
    {
        return $this->category_name;
    }

    public function setCategoryName(string $category_name): self
    {
        $this->category_name = $category_name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
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

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUsers(User $users): self
    {
        if (!$this->users->contains($users)) {
            $this->users[] = $users;
            $users->setCategory($this);
        }

        return $this;
    }

    public function removeUsers(User $users): self
    {
        if ($this->users->removeElement($users)) {
            // set the owning side to null (unless already changed)
            if ($users->getCategory() === $this) {
                $users->setCategory(null);
            }
        }

        return $this;
    }


}