<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user_browse","user_read","user_current", "category_browse", "comment_read", "comment_browse"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_browse","user_read","user_current", "comment_read", "comment_browse"})
     */
    private $pseudo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current", "comment_read", "comment_browse"})
     */
    private $avatar = "smiley.jpg";

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_browse","user_read","user_current", "category_browse"})
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Gedmo\Slug(fields={"pseudo"})
     * @Groups({"user_browse","user_read","user_current", "category_browse"})
     */
    private $slug;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user_read"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current", "category_browse"})
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $logo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $phone;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $facebook;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $twitter;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $instagram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $pinterest;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $website;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $linkedin;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user_browse","user_read","user_current"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user", orphanRemoval=true, cascade={"persist"})
     * @ORM\OrderBy({"createdAt" = "DESC"})
     * @Groups({"user_browse","user_read", "comment_read"})
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Picture::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"user_browse","user_read","user_current", "category_browse"})
     */
    private $pictures;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="user", cascade={"persist"})
     * @Groups({"user_browse","user_read","user_current"})
     * @Groups({"category_read"})
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="userReceived", orphanRemoval=true)
     * @Groups({"user_browse", "user_read"})
     */
    private $commentsReceived;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->comments = new ArrayCollection();
        $this->pictures = new ArrayCollection();
        $this->commentsReceived = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPseudo(): string
    {
        return $this->pseudo;
    }

    public function setPseudo(?string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        // $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(?string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }


    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getFacebook(): ?string
    {
        return $this->facebook;
    }

    public function setFacebook(?string $facebook): self
    {
        $this->facebook = $facebook;

        return $this;
    }

    public function getTwitter(): ?string
    {
        return $this->twitter;
    }

    public function setTwitter(?string $twitter): self
    {
        $this->twitter = $twitter;

        return $this;
    }

    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    public function setInstagram(?string $instagram): self
    {
        $this->instagram = $instagram;

        return $this;
    }

    public function getPinterest(): ?string
    {
        return $this->pinterest;
    }

    public function setPinterest(?string $pinterest): self
    {
        $this->pinterest = $pinterest;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(?string $linkedin): self
    {
        $this->linkedin = $linkedin;

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


    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Picture[]
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(Picture $picture): self
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures[] = $picture;
            $picture->setUser($this);
        }

        return $this;
    }

    public function removePicture(Picture $picture): self
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getUser() === $this) {
                $picture->setUser(null);
            }
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getCommentsReceived(): Collection
    {
        return $this->commentsReceived;
    }

    public function addCommentsReceived(Comment $commentsReceived): self
    {
        if (!$this->commentsReceived->contains($commentsReceived)) {
            $this->commentsReceived[] = $commentsReceived;
            $commentsReceived->setUserReceived($this);
        }

        return $this;
    }

    public function removeCommentsReceived(Comment $commentsReceived): self
    {
        if ($this->commentsReceived->removeElement($commentsReceived)) {
            // set the owning side to null (unless already changed)
            if ($commentsReceived->getUserReceived() === $this) {
                $commentsReceived->setUserReceived(null);
            }
        }

        return $this;
    }

}
