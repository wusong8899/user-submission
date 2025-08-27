<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Serializer;

use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Constants\UserSubmissionConstants;
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
            'user_account' => $submission->user_account,
            'submission_user_id' => $submission->submission_user_id,
            'review_user_id' => $submission->review_user_id,
            'review_result' => match ($submission->review_result) {
                UserSubmissionConstants::REVIEW_RESULT_APPROVED => 'approved',
                UserSubmissionConstants::REVIEW_RESULT_REJECTED => 'rejected',
                default => null
            },
            'assigned_at' => $submission->assigned_at?->toISOString(),
            'reviewed_at' => $submission->reviewed_at?->toISOString(),
            'created_at' => $submission->created_at?->toISOString(),
            'updated_at' => $submission->updated_at?->toISOString(),
            'is_pending' => $submission->isPending(),
            'is_approved' => $submission->isApproved(),
            'is_rejected' => $submission->isRejected(),
        ];
    }

    /**
     * Get a relationship with the user who submitted this submission
     */
    protected function fromUser(UserSubmission $submission): ?Relationship
    {
        return $this->hasOne($submission, BasicUserSerializer::class);
    }

    /**
     * Get a relationship with the user who reviewed this submission
     */
    protected function reviewUser(UserSubmission $submission): ?Relationship
    {
        return $this->hasOne($submission, BasicUserSerializer::class);
    }
}
