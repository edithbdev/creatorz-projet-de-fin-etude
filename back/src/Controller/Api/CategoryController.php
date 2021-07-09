<?php

namespace App\Controller\Api;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/api/categories", name="api_categories_")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAll();

        return $this->json($categories, Response::HTTP_OK, [], [
            'groups' => ['category_browse'],
        ]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"})
     */
    public function read(Category $category): Response
    {
        return $this->json($category, Response::HTTP_OK, [], [
            'groups' => ['category_read'],
        ]);
    }

}
