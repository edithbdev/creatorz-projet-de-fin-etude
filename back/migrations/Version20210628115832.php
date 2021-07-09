<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210628115832 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment ADD user_received_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C113A2C60 FOREIGN KEY (user_received_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9474526C113A2C60 ON comment (user_received_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C113A2C60');
        $this->addSql('DROP INDEX IDX_9474526C113A2C60 ON comment');
        $this->addSql('ALTER TABLE comment DROP user_received_id');
    }
}