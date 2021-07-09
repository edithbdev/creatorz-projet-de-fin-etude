<?php

namespace App\Controller\Api;

use App\Entity\Picture;
use App\Entity\User;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\UnsupportedMediaTypeHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api")
 */
class PictureController extends AbstractController
{

    /**
     * @Route("/users/{id}/add-picture", name="api_picture", methods={"POST"})
     */
    public function add(EntityManagerInterface $entityManager, Request $request, SerializerInterface $serializer, ValidatorInterface $validator, User $user)
    {
        $contenu = $request->getContent();

        try {
            // Deserializer = Switch from JSON format to Object format and get an associative array
            $newPicture = $serializer->deserialize($contenu, Picture::class, 'json');

            // If there is an error, we return a 400 error
            $errors = $validator->validate($newPicture);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            $user->addPicture($newPicture);
            // $user->getId($newPicture);

            // We persist the object then we flush
            $entityManager->persist($newPicture);
            $entityManager->flush();

            return $this->json($newPicture, 201, [], [
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
     * @Route("/picture/{id}/upload-picture", name="upload-picture", methods={"POST"}, requirements={"id"="\d+"})
     */
    public function uploadPhoto(EntityManagerInterface $entityManager, Request $request, Picture $picture, FileUploader $fileUploader)
    {
        $pictureName = $request->files->get('name', 'id');
        // $pictureName = $request->files->get('id');

        if ($pictureName) {
            try {
                $photoFileName = $fileUploader->upload($pictureName);
            } catch (\Exception $e) {
                throw new UnsupportedMediaTypeHttpException($e);
            }
            $picture->setName($photoFileName);
            $picture->getId($photoFileName);

            // We persist the object then we flush
            $entityManager->persist($picture);
            $entityManager->flush();

            return $this->json($picture, 201, [], [
                'groups' => 'user_read'
            ]);
        }
    }

    /**
     * @Route("/picture/{id}", name="edit", methods={"PUT"}, requirements={"id" = "\d+"})
     */
    public function edit(Picture $picture, EntityManagerInterface $entityManager, Request $request, SerializerInterface $serializer, ValidatorInterface $validator)
    {

        $contenu = $request->getContent();

        try {

            // Deserializer = Switch from JSON format to Object format and get an associative array
            $editedPicture = $serializer->deserialize($contenu, Picture::class, 'json');

            $picture->setName($editedPicture->getName());


            // If there is an error, we return a 400 error
            $errors = $validator->validate($picture);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            // We persist the object then we flush

            $entityManager->flush();

            return $this->json($picture, 201, [], [
                'groups' => 'user_read'
            ]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ]);
        }
    }
}
