<?php

namespace App\Controller\Api;

use App\Entity\Category;
use App\Entity\User;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnsupportedMediaTypeHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/users", name="api_users_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(UserRepository $userRepository): Response
    {
        $users = $userRepository->findBy([], ['createdAt' => 'DESC']);

        return $this->json($users, Response::HTTP_OK, [], [
            'groups' => ['user_browse'],
        ]);
    }

    /**
     * @Route("/creator", name="creator", methods={"GET"})
     */
    public function creator(UserRepository $userRepository): Response
    {
        $users = $userRepository->findUsersByRole('ROLE_CREATOR');
        return $this->json($users, Response::HTTP_OK, [], [
            'groups' => ['user_browse'],
        ]);
    }

    /**
     * @Route("/commentator", name="commentator", methods={"GET"})
     */
    public function commentator(UserRepository $userRepository): Response
    {
        $users = $userRepository->findUsersByRole('ROLE_USER');
        return $this->json($users, Response::HTTP_OK, [], [
            'groups' => ['user_browse'],
        ]);
    }

    /**
     * @Route("/current", name="current", methods={"GET"})
     * UserInterface = user current = user connecté
     */
    public function current(UserInterface $user): Response
    {
        //filtrer les données (ex password)

        return $this->json($user, Response::HTTP_OK, [], [
            'groups' => ['user_current'],
        ]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id"="\d+"})
     * User = User avec id
     */
    public function read(User $user): Response
    {
        return $this->json($user, Response::HTTP_OK, [], [
            'groups' => ['user_read'],
        ]);
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(EntityManagerInterface $entityManager, Request $request, SerializerInterface $serializer, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher, CategoryRepository $categoryRepository)
    {
        $contenu = $request->getContent();
        try {

            // Deserializer = Switch from JSON format to Object format
            $newUser = $serializer->deserialize($contenu, User::class, 'json');

            // If there is an error, we return a 400 error
            $errors = $validator->validate($newUser);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $jsonArray = json_decode($contenu, true);

            $categoryId = $jsonArray['category'];

            // Retrieve the category and associate it with the new user
            $category = $categoryRepository->find($categoryId);
            $newUser->setCategory($category);

            // Input password
            $newPassword = $newUser->getPassword();
            if ($newPassword != null) {
                $encodedPassword = $passwordHasher->hashPassword($newUser, $newPassword);
                $newUser->setPassword($encodedPassword);
            }

            // We persist the object then we flush
            $entityManager->persist($newUser);
            $entityManager->flush();

            return $this->json($newUser, 201, [], [
                'groups' => 'user_read'
            ]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * @Route("/{id}/upload-avatar", name="upload-avatar", methods={"POST"}, requirements={"id"="\d+"})
     */
    public function uploadAvatar(EntityManagerInterface $entityManager, Request $request, User $user, FileUploader $fileUploader)
    {
        $avatar = $request->files->get('avatar');

        if ($avatar) {
            try {
                $avatarFileName = $fileUploader->upload($avatar);
            } catch (\Exception $e) {
                throw new UnsupportedMediaTypeHttpException($e);
            }
            $user->setAvatar($avatarFileName);

            // On persist l'objet puis on flush
            $entityManager->persist($user);
            $entityManager->flush();
        }
        //dd($user);
        return $this->json($user, 201, [], [
            'groups' => 'user_read'
        ]);
    }

    /**
     * @Route("/{id}", name="edit", methods={"PUT"}, requirements={"id" = "\d+"})
     */
    public function edit(User $user, EntityManagerInterface $entityManager, Request $request, SerializerInterface $serializer, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher)
    {

        $contenu = $request->getContent();
        try {

            // Deserializer = Switch from JSON format to Object format and get an associative array
            $editedUser = $serializer->deserialize($contenu, User::class, 'json');

            $user->setPseudo($editedUser->getPseudo());

            if ($user->getAvatar() == null) {

                $user->setAvatar($editedUser->getAvatar());
            }

            $user->setEmail($editedUser->getEmail());
            // $user->setRoles($editedUser->getRoles());
            $user->setFirstname($editedUser->getFirstname());
            $user->setLastname($editedUser->getLastname());
            $user->setBrand($editedUser->getBrand());
            // $user->setLogo($editedUser->getLogo());
            $user->setPhone($editedUser->getPhone());
            $user->setDescription($editedUser->getDescription());
            // $user->setStatus($editedUser->getStatus());
            $user->setFacebook($editedUser->getFacebook());
            $user->setTwitter($editedUser->getTwitter());
            $user->setInstagram($editedUser->getInstagram());
            $user->setPinterest($editedUser->getPinterest());
            $user->setWebsite($editedUser->getWebsite());
            $user->setLinkedin($editedUser->getLinkedin());

            // Input password
            $newPassword = $editedUser->getPassword();
            if ($newPassword != null) {
                $encodedPassword = $passwordHasher->hashPassword($editedUser, $newPassword);
                $user->setPassword($encodedPassword);
            }

            // If there is an error, we return a 400 error
            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            // We persist the object then we flush

            $entityManager->flush();

            return $this->json($user, 201, [], [
                'groups' => 'user_read'
            ]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(User $user)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
