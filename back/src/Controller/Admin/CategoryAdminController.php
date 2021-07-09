<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Gedmo\Sluggable\Util\Urlizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/category", name="admin_category_")
 */
class CategoryAdminController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods="GET")
     */
    public function browseCategory(CategoryRepository $category): Response
    {
        // Method to list and display all categories
        return $this->render('admin/category/browseCategory.html.twig', [
            'categories' => $category->findAll()
        ]);
    }

    /**
     * @Route("/add", name="add", methods={"GET","POST"})
     */
    public function addCategory(Request $request)
    {
        // Method to add a category via the admin on the site
        $category = new Category;

        // will generate a 403 if the user does not have the requested role to add a catageory
        // cf. Security\Voter\CategoryVoter
        $this->denyAccessUnlessGranted('CATEGORY_ADD', $category);

        $form = $this->createForm(CategoryType::class, $category);

        // handleRequest takes the data in POST and places it in $form then in $category
        $form->handleRequest($request);

        // if the form is submitted and valid, and if the uploadedFil is not null then we save the image
        // https://symfonycasts.com/screencast/symfony-uploads/upload-in-form
        if ($form->isSubmitted() && $form->isValid()) {
            $uploadedFile = $form->get('photo')->getData();
            if ($uploadedFile != null) {
                $destination = $this->getParameter('kernel.project_dir') . '/public/images';
                $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
                $newFilename = Urlizer::urlize($originalFilename) . '-' . uniqid() . '.' . $uploadedFile->guessExtension();
                $uploadedFile->move(
                    $destination,
                    $newFilename
                );
                $category->setPhoto($newFilename);
            }
            $em = $this->getDoctrine()->getManager();
            $em->persist($category);
            $em->flush();

            // if the category is edited, we confirm with a message
            $this->addFlash('success', 'La catégorie à bien été ajoutée.');

            // We redirect the user to the category list page
            return $this->redirectToRoute('admin_category_browse');
        }

        return $this->render('admin/category/addCategory.html.twig', [
            'category' => $category,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"})
     */
    public function readCategory(Category $category): Response
    {
        // Method to READ a category
        return $this->render('admin/category/readCategory.html.twig', [
            'category' => $category,
        ]);
    }

    /**
     * @Route("/edit/{id}", name="edit", methods={"GET","POST"})
     */
    public function editCategory(Category $category, Request $request): Response
    {
        // Method to edit a category via the admin on the site

        // will generate a 403 if the user does not have the requested role to edit a catageory
        // cf. Security\Voter\CategoryVoter
        $this->denyAccessUnlessGranted('CATEGORY_EDIT', $category);

        $form = $this->createForm(CategoryType::class, $category);

        // handleRequest takes the data in POST and places it in $form then in $category
        $form->handleRequest($request);

        // if the form is submitted and valid, and if the uploadedFil is not null then we save the image
        // https://symfonycasts.com/screencast/symfony-uploads/upload-in-form
        if ($form->isSubmitted() && $form->isValid()) {
            $uploadedFile = $form->get('photo')->getData();
            if ($uploadedFile != null) {
                $destination = $this->getParameter('kernel.project_dir') . '/public/images';
                $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
                $newFilename = Urlizer::urlize($originalFilename) . '-' . uniqid() . '.' . $uploadedFile->guessExtension();
                $uploadedFile->move(
                    $destination,
                    $newFilename
                );
                $category->setPhoto($newFilename);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->flush();

        // if the category is edited, we confirm with a message
        $this->addFlash('success', 'La catégorie à bien été modifiée.');

        // We redirect the user to the category list page
        return $this->redirectToRoute('admin_category_browse');
        }

        return $this->render('admin/category/editCategory.html.twig', [
            'category' => $category,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/{id}", name="delete", requirements={"id"="\d+"}, methods={"DELETE","POST"})
     */
    public function deleteCategory(Request $request, Category $category)
    {
        // Method to delete a catageory

        // will generate a 403 if the user does not have the requested role to delete a catageory
        // cf. Security\Voter\CategoryVoter
        $this->denyAccessUnlessGranted('CATEGORY_DELETE', $category);

        // Before deleting $category, we check the token
        if ($this->isCsrfTokenValid('delete' . $category->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($category);
            $entityManager->flush();
        }

        // if the category is deleted, we confirm with a message
        $this->addFlash('success', 'La catégorie à bien été supprimée.');

        // We redirect the user to the category list page
        return $this->redirectToRoute('admin_category_browse');

        // If the token is not valid, we throw an Access Denied exception
        throw $this->createAccessDeniedException('Le token n\'est pas valide.');
    }
}
