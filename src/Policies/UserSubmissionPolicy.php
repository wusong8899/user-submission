<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Policies;

use wusong8899\userSubmission\Model\UserSubmission;
use Flarum\User\User;
use Flarum\User\Access\AbstractPolicy;

/**
 * Policy for UserSubmission model authorization
 */
class UserSubmissionPolicy extends AbstractPolicy
{
    /**
     * Check if user can view submissions
     */
    public function view(User $actor, UserSubmission $submission): string
    {
        // Admin can view all submissions
        if ($actor->isAdmin()) {
            return $this->allow();
        }

        // Users can view their own submissions
        if ($actor->id === $submission->submission_user_id) {
            return $this->allow();
        }

        return $this->deny();
    }

    /**
     * Check if user can create submissions
     */
    public function create(User $actor): string
    {
        // All authenticated users can create submissions
        return $this->allow();
    }

    /**
     * Check if user can update submissions (review)
     */
    public function update(User $actor, UserSubmission $submission): string
    {
        // Only admins can review submissions
        if ($actor->isAdmin()) {
            return $this->allow();
        }

        return $this->deny();
    }

    /**
     * Check if user can delete submissions
     */
    public function delete(User $actor, UserSubmission $submission): string
    {
        // Admin can delete any submission
        if ($actor->isAdmin()) {
            return $this->allow();
        }

        // Users can only delete their own submissions
        if ($actor->id === $submission->submission_user_id) {
            return $this->allow();
        }

        return $this->deny();
    }
}
