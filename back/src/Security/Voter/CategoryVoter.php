<?php

namespace App\Security\Voter;

use App\Entity\Category;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class CategoryVoter extends Voter
{
    /**
     * Returns a boolean which indicates if our Vote takes care of the  right requested on the type of object requested
     *
     * @param string $attribute The type of action requested on the object
     * @param $subject The object for which one asks if the action is authorized
     * @return boolean
     */
    protected function supports(string $attribute, $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['CATEGORY_ADD', 'CATEGORY_EDIT', 'CATEGORY_DELETE'])
            && $subject instanceof Category;
    }

    /**
     * If supports () replied TRUE, Symfony executes voteOnAttribute ()
     * This function answered true to authorize the requested right, false otherwise
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        switch ($attribute) {
            case 'CATEGORY_ADD':
                if (in_array('ROLE_SUPERADMIN', $user->getRoles())) {
                    return true;
                }

                break;
            case 'CATEGORY_EDIT':

                if (in_array('ROLE_ADMIN', $user->getRoles()) || in_array('ROLE_SUPERADMIN', $user->getRoles())) {
                    return true;
                }
                break;
            case 'CATEGORY_DELETE':

                if (in_array('ROLE_SUPERADMIN', $user->getRoles())) {
                    return true;
                }
                break;
        }

        return false;
    }
}
