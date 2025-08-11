<?php

namespace wusong8899\userSubmission\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

class UserSubmission extends AbstractModel
{
    use ScopeVisibilityTrait;
    protected $table = 'wusong8899_user_submission';

    public function fromUser()
    {
        return $this->hasOne(User::class, 'id', 'submission_user_id');
    }

    public function reviewUser()
    {
        return $this->hasOne(User::class, 'id', 'review_user_id');
    }
}
