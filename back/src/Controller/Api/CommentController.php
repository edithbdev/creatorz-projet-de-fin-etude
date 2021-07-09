<?php

namespace App\Controller\Api;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/comments", name="api_comments_")
 */
class CommentController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(CommentRepository $commentRepository): Response
    {
        $comments = $commentRepository->findBy([], ['createdAt' => 'DESC']);
        return $this->json($comments, Response::HTTP_OK, [], [
            'groups' => ['comment_browse'],
        ]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"})
     */
    public function read(Comment $comment)
    {
        return $this->json($comment, Response::HTTP_OK, [], [
            'groups' => ['comment_read'],
        ]);
    }

    /**
         * @Route("", name="add", methods={"POST"})
         */
    public function add(EntityManagerInterface $entityManager, Request $request, DenormalizerInterface $denormalizer, UserRepository $userRepository)
    {
        $contenu = $request->getContent();

        try {

             // transformer le contenu récupéré en tableau
            $jsonArray = json_decode($contenu, true);

            // récuperer l'id de la user
            $userId = $jsonArray['user'];
            $userReceivedId = $jsonArray['userReceived'];

            //transformer le contenu tableau vers objet
            $newComment = $denormalizer->denormalize($jsonArray, Comment::class, 'array');

            // Récupérer le commentaire et l'associer au nouvel utilisateur
            $user = $userRepository->find($userId);
            $userReceived = $userRepository->find($userReceivedId);

            $newComment->setUser($user);
            $newComment->setUserReceived($userReceived);

            // $user->addComment($newComment);
            // $creator->addCommentsReceive($newComment);

            // On persist l'objet puis on flush
            $entityManager->persist($newComment);
            $entityManager->flush();
            return $this->json($newComment, 201, [], [
                 'groups' => 'comment_read'
             ]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                 'status' => 400,
                 'message' => $e->getMessage()
             ]);
        }
    }

}
