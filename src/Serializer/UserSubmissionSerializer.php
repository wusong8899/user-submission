<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Serializer;

use wusong8899\userSubmission\Model\UserSubmission;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Tobscure\JsonApi\Relationship;

/**
 * Serializer for UserSubmission model
 */
class UserSubmissionSerializer extends AbstractSerializer
{
    protected $type = 'userSubmissionList';

    /**
     * Get the default set of serialized attributes for a model.
     */
    protected function getDefaultAttributes($submission): array
    {
        /** @var UserSubmission $submission */
        return [
            'id' => $submission->id,
            'amount' => $submission->amount,
            'platform' => $submission->platform,
            'platform_account' => $submission->platform_account,
            'user_account' => $submission->user_account,
            'submission_user_id' => $submission->submission_user_id,
            'review_user_id' => $submission->review_user_id,
            'review_result' => $submission->review_result,
            'review_status' => $submission->review_status,
            'assigned_at' => $submission->assigned_at?->toISOString(),
            'reviewed_at' => $submission->reviewed_at?->toISOString(),
            'is_pending' => $submission->isPending(),
            'is_approved' => $submission->isApproved(),
            'is_rejected' => $submission->isRejected(),
        ];
    }

    /**
     * Get a relationship with the user who submitted this submission
     */
    protected function fromUser($submission): ?Relationship
    {
        return $this->hasOne($submission, BasicUserSerializer::class);
    }

    /**
     * Get a relationship with the user who reviewed this submission
     */
    protected function reviewUser($submission): ?Relationship
    {
        return $this->hasOne($submission, BasicUserSerializer::class);
    }
}
