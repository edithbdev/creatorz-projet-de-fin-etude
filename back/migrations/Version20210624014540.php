<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210624014540 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649A21214B7');
        $this->addSql('DROP INDEX IDX_8D93D649A21214B7 ON user');
        $this->addSql('ALTER TABLE user CHANGE categories_id category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64912469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64912469DE2 ON user (category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64912469DE2');
        $this->addSql('DROP INDEX IDX_8D93D64912469DE2 ON user');
        $this->addSql('ALTER TABLE user CHANGE category_id categories_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649A21214B7 FOREIGN KEY (categories_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649A21214B7 ON user (categories_id)');
    }
}
