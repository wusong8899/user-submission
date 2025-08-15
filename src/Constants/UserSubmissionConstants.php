<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Constants;

/**
 * Constants for User Submission extension
 */
final class UserSubmissionConstants
{
    // Review result constants
    public const REVIEW_RESULT_PENDING = null;
    public const REVIEW_RESULT_APPROVED = 1;
    public const REVIEW_RESULT_REJECTED = 0;

    // Review status strings
    public const REVIEW_STATUS_PENDING = 'pending';
    public const REVIEW_STATUS_APPROVED = 'approved';
    public const REVIEW_STATUS_REJECTED = 'rejected';

    // Validation constants
    public const MIN_AMOUNT = 0;
    public const MAX_PLATFORM_LENGTH = 500;
    public const MAX_ACCOUNT_LENGTH = 500;

    // Error message keys
    public const ERROR_SAVE_FAILED = 'wusong8899-user-submission.forum.save-error';
    public const ERROR_SUBMISSION_IN_REVIEW = 'wusong8899-user-submission.forum.submission-in-review';
    public const ERROR_UNAUTHORIZED = 'wusong8899-user-submission.forum.unauthorized';
    public const ERROR_NOT_FOUND = 'wusong8899-user-submission.forum.not-found';
    public const ERROR_DELETE_FAILED = 'wusong8899-user-submission.forum.delete-error';

    // Database table name
    public const TABLE_NAME = 'wusong8899_user_submission';

    // Default timezone
    public const DEFAULT_TIMEZONE = 'Asia/Shanghai';

    // Permission keys
    public const PERMISSION_DELETE_OWN = 'user-submission.delete-own';
    public const PERMISSION_DELETE_ANY = 'user-submission.delete-any';
    public const PERMISSION_REVIEW = 'user-submission.review';

    private function __construct()
    {
        // Prevent instantiation
    }
}
