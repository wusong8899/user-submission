<?php

namespace wusong8899\userSubmission\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use wusong8899\userSubmission\Model\UserSubmission;

class UserSubmissionBlueprint implements BlueprintInterface
{
    public $userSubmission;

    public function __construct(UserSubmission $userSubmission)
    {
        $this->userSubmission = $userSubmission;
    }

    public function getSubject()
    {
        return $this->userSubmission;
    }

    public function getFromUser()
    {
        return $this->userSubmission->fromUser;
    }

    public function getData()
    {
        return null;
    }

    public static function getType()
    {
        return 'userSubmissionList';
    }

    public static function getSubjectModel()
    {
        return UserSubmission::class;
    }
}
