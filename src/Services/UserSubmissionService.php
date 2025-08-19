<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Services;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use wusong8899\userSubmission\Model\UserSubmission;
use Flarum\User\User;
use Illuminate\Support\Carbon;

/**
 * Service class for User Submission business logic
 */
class UserSubmissionService
{
    public function __construct(
        private readonly TimezoneService $timezoneService
    ) {
    }

    /**
     * Check if user has pending submissions
     */
    public function hasPendingSubmissions(int $userId): bool
    {
        return UserSubmission::where([
            'submission_user_id' => $userId,
            'review_user_id' => null
        ])->exists();
    }

    /**
     * Create a new user submission
     */
    public function createSubmission(
        int $userId,
        float $amount,
        string $userAccount
    ): UserSubmission {
        $userSubmission = new UserSubmission();
        $userSubmission->amount = $amount;
        $userSubmission->submission_user_id = $userId;
        $userSubmission->user_account = $userAccount;
        $userSubmission->assigned_at = Carbon::now($this->timezoneService->getTimezone());
        $userSubmission->save();

        return $userSubmission;
    }

    /**
     * Review a submission
     */
    public function reviewSubmission(
        UserSubmission $submission,
        int $reviewerId,
        int $reviewResult
    ): UserSubmission {
        $submission->review_result = $reviewResult;
        $submission->review_user_id = $reviewerId;
        $submission->reviewed_at = Carbon::now($this->timezoneService->getTimezone());
        $submission->save();

        return $submission;
    }

    /**
     * Check if user can delete submission
     */
    public function canDeleteSubmission(User $actor, UserSubmission $submission): bool
    {
        // Admin can delete any submission
        if ($actor->isAdmin()) {
            return true;
        }

        // User can only delete their own submissions
        return $actor->id === $submission->submission_user_id;
    }

    /**
     * Delete a submission
     */
    public function deleteSubmission(UserSubmission $submission): bool
    {
        return $submission->delete();
    }

    /**
     * Validate submission data
     */
    public function validateSubmissionData(array $data): array
    {
        $errors = [];

        if (!isset($data['amount']) || $data['amount'] < UserSubmissionConstants::MIN_AMOUNT) {
            $errors[] = UserSubmissionConstants::ERROR_SAVE_FAILED;
        }

        if (isset($data['userAccount']) && strlen($data['userAccount']) > UserSubmissionConstants::MAX_USER_ACCOUNT_LENGTH) {
            $errors[] = UserSubmissionConstants::ERROR_SAVE_FAILED;
        }

        return $errors;
    }

    /**
     * Convert review result to status string
     */
    public function getReviewStatusString(?int $reviewResult): string
    {
        return match ($reviewResult) {
            UserSubmissionConstants::REVIEW_RESULT_APPROVED => UserSubmissionConstants::REVIEW_STATUS_APPROVED,
            UserSubmissionConstants::REVIEW_RESULT_REJECTED => UserSubmissionConstants::REVIEW_STATUS_REJECTED,
            default => UserSubmissionConstants::REVIEW_STATUS_PENDING,
        };
    }
}
