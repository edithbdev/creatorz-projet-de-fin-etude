<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @Route("/admin", name="admin_")
 */
class UserAdminController extends AbstractController
{
    /**
     * @Route("/all", name="userAll_browse", methods={"GET"})
     */
    public function browse(UserRepository $userRepository): Response
    {
        // Method to list and display all users (users, admin and creators)
        return $this->render('admin/user/browse.html.twig', [
            'users' => $userRepository->findBy([], ['createdAt' => 'DESC']),
        ]);
    }

    /**
     * @Route("/user", name="user_browse", methods={"GET"})
     */
    public function browseUser(UserRepository $userRepository): Response
    {
        // Method to list and display all users (without admin)
        return $this->render('admin/user/browseUser.html.twig', [
            'users' => $userRepository->findUsersByRole('ROLE_USER'),
        ]);
    }

    /**
     * @Route("/userAdmin", name="userAdmin_browse", methods={"GET"})
     */
    public function browseAdmin(UserRepository $userRepository): Response
    {
        // Method to list and display only admin
        return $this->render('admin/user/browseAdmin.html.twig', [
            'users' => $userRepository->findUsersByRole('ROLE_ADMIN', ),
        ]);
    }

    /**
     * @Route("/add/user", name="add_user", methods={"GET","POST"})
     */
    public function addUser(Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Method to add a user

        $user = new User();

        // will generate a 403 if the user does not have the requested role to add a user
        // cf. Security\Voter\UserVoter
        $this->denyAccessUnlessGranted('USER_ADD', $user);
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // As the form is valid, we will encode the password then put it in $user
            $newPassword = $form->get('password')->getData();

            if ($newPassword != null) {
                $encodedPassword = $passwordHasher->hashPassword($user, $newPassword);
                $user->setPassword($encodedPassword);
            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            // if the user is added, we confirm with a message
            $this->addFlash('success', 'L\'utilisateur à bien été ajouté.');

            // We redirect the user to the user list page
            return $this->redirectToRoute('admin_userAll_browse');
        }

        return $this->render('admin/user/addUser.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_read", methods={"GET"})
     */
    public function readUser(User $user): Response
    {
        // Method to READ a user
        return $this->render('admin/user/readUser.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/edit/{id}", name="user_edit", methods={"GET","POST"})
     */
    public function editUser(Request $request, User $user, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Method to edit a user via the admin on the site

        // will generate a 403 if the user does not have the requested role to edit a user
        // cf. Security\Voter\UserVoter
        $this->denyAccessUnlessGranted('USER_EDIT', $user);

        $form = $this->createForm(UserType::class, $user);

        // handleRequest takes the data in POST and places it in $form then in $user
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // As the form is valid, we will encode the password then put it in $user
            $newPassword = $form->get('password')->getData();

            if ($newPassword != null) {
                $encodedPassword = $passwordHasher->hashPassword($user, $newPassword);
                $user->setPassword($encodedPassword);
            }

            $this->getDoctrine()->getManager()->flush();
            $this->addFlash('success', 'L\'utilisateur à bien été modifié.');

            // We redirect the user to the userAll list page
            return $this->redirectToRoute('admin_userAll_browse');
        }

        return $this->render('admin/user/editUser.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/user/{id}", name="user_delete", requirements={"id"="\d+"}, methods={"DELETE","POST"})
     */
    public function deleteUser(Request $request, User $user): Response
    {
        $this->denyAccessUnlessGranted('USER_DELETE', $user);

        // Before deleting $user, we check the token
        if ($this->isCsrfTokenValid('delete' . $user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }
        // if the user is deleted, we confirm with a message
        $this->addFlash('success', 'L\'utilisateur à bien été supprimé.');

        // We redirect the user to the userAll list page
        return $this->redirectToRoute('admin_userAll_browse');
    }
}
