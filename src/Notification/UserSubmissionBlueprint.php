<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;
use wusong8899\userSubmission\Model\UserSubmission;

/**
 * Notification blueprint for user submission events
 */
class UserSubmissionBlueprint implements BlueprintInterface
{
    public function __construct(
        private readonly UserSubmission $userSubmission
    ) {
    }

    /**
     * Get the subject of the notification
     */
    public function getSubject(): UserSubmission
    {
        return $this->userSubmission;
    }

    /**
     * Get the user who triggered the notification
     */
    public function getFromUser(): ?User
    {
        return $this->userSubmission->fromUser;
    }

    /**
     * Get additional data for the notification
     */
    public function getData(): ?array
    {
        return [
            'review_result' => $this->userSubmission->review_result,
            'amount' => $this->userSubmission->amount,
            'user_account' => $this->userSubmission->user_account,
        ];
    }

    /**
     * Get the notification type
     */
    public static function getType(): string
    {
        return 'userSubmissionList';
    }

    /**
     * Get the subject model class
     */
    public static function getSubjectModel(): string
    {
        return UserSubmission::class;
    }
}
