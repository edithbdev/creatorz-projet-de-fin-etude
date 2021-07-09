<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PageTest extends WebTestCase
{
    public function testApiPageCategory(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/api/categories');

        $this->assertResponseIsSuccessful();
    }

    public function testApiPageUser(): void
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/api/users');

        $this->assertResponseIsSuccessful();
    }

    public function testApiPageComment(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/api/comments');

        $this->assertResponseIsSuccessful();
    }
   
}
