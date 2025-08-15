<?php

namespace wusong8899\userSubmission\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;

class UserSubmissionSerializer extends AbstractSerializer
{
    protected $type = 'userSubmissionList';

    protected function getDefaultAttributes($shop)
    {
        return [
            'id' => $shop->id,
            'amount' => $shop->amount,
            'platform' => $shop->platform,
            'platform_account' => $shop->platform_account,
            'user_account' => $shop->user_account,
            'submission_user_id' => $shop->submission_user_id,
            'review_user_id' => $shop->review_user_id,
            'review_result' => $shop->review_result,
            'assigned_at' => $shop->assigned_at,
            'reviewed_at' => $shop->reviewed_at,
        ];
    }

    protected function fromUser($data)
    {
        return $this->hasOne($data, BasicUserSerializer::class);
    }

    protected function reviewUser($data)
    {
        return $this->hasOne($data, BasicUserSerializer::class);
    }
}
