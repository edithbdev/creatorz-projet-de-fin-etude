<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class)
            ->add('pseudo', TextType::class)
            ->add('firstname', TextType::class, [
                'label' => 'Prénom',
                'required' => false,
            ])
            ->add('lastname', TextType::class, [
                'label' => 'Nom',
                'required' => false,
            ])
            ->add('roles', ChoiceType::class, [
                'choices' => User::class,
                'choices' => [
                    'Super Administrateur' => 'ROLE_SUPERADMIN',
                    'Administrateur' => 'ROLE_ADMIN',
                    'Créateur' =>     'ROLE_CREATOR',
                    'Visiteur' => 'ROLE_USER',
                ],
                'multiple' => true,
                'expanded' => true,
                'required' => true,

            ])
            ->add('slug')
            ->add('brand', TextType::class, [
                'label' => 'Marque',
                'required' => false,
            ])

            ->add('phone', TextType::class, [
                'label' => 'téléphone',
                'required' => false,
            ])
            ->add('description', TextareaType::class, [
                'required' => false,
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'required' => false,
                'choice_label' => function ($category) {
                    return $category->getCategoryName();
                }
            ])
            ->add('avatar', TextType::class, [
                'label' => 'Avatar',
                'required' => false,
            ])
            ->add('facebook', TextType::class, [
                'required' => false,
            ])
            ->add('twitter', TextType::class, [
                'required' => false,
            ])
            ->add('instagram', TextType::class, [
                'required' => false,
            ])
            ->add('pinterest', TextType::class, [
                'required' => false,
            ])
            ->add('linkedin', TextType::class, [
                'required' => false,
            ])
            ->add('website', TextType::class, [
                'required' => false,
            ])

            ->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
                // On récupère l'objet User et le formulaire
                $user = $event->getData();
                $form = $event->getForm();

                if ($user->getId() === null) {
                    $required = true;
                } else {
                    $required = false;
                }

                $form->add('password', RepeatedType::class, [
                    'mapped' => false,
                    'type' => PasswordType::class,
                    'required' => $required,
                    'first_options'  => ['label' => 'Mot de passe'],
                    'second_options' => ['label' => 'Répétez le mot de passe'],
                    'invalid_message' => 'Les mots de passe doivent être identiques.'
                ]);
            });

        // On ajoute les Data Transformers à la fin
        // Notre propriété $roles dans User DOIT être un tableau.
        // On souhaite proposer des boutons radio pour sélectionner un role et un seul
        // De ce fait, le ChoiceType nous retourne une string.
        // On doit donc transformer le tableau de User en string
        // et transformer la string du ChoiceType en tableau
        //     $builder->get('roles')->addModelTransformer(new CallbackTransformer(
        //         // Transforme la données de l'entité pour le formulaire
        //         function (array $rolesArray): string {
        //             // retourne le premier role dans le tableau
        //             // Si le tableau est vide, l'index 0 n'existe et on retourne une string vide
        //             return $rolesArray[0] ?? '' ;
        //         },
        //         // Transformer la donnée du formulaire pour l'entité
        //         function (string $roleString): array {
        //             // retourne la string dans un tableau
        //             return [$roleString];
        //         }
        //     ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }

    // On a opté pour la solution où on met une fonction anonyme dans addEventListener (l.31)
    // Ici c'est pareil, sauf que la méthode est déclaré à part dans la classe. On déclare notre événement l.69
    public function addPasswordField(FormEvent $event)
    {
        $user = $event->getData();
        $form = $event->getForm();

        $required = $user->getId() === null;

        $form->add('password', RepeatedType::class, [
            'mapped' => false,
            'type' => PasswordType::class,
            'required' => $required,
            'first_options'  => ['label' => 'Mot de passe'],
            'second_options' => ['label' => 'Répétez le mot de passe'],
            'invalid_message' => 'Les mots de passe doivent être identiques.'
        ]);
    }
}
