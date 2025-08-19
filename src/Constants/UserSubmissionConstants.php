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

    // Enhanced validation constants
    public const MIN_AMOUNT = 0.01;
    public const MAX_AMOUNT = 999999.99;
    public const MAX_USER_ACCOUNT_LENGTH = 500;
    public const MIN_USER_ACCOUNT_LENGTH = 1;

    // Error message keys
    public const ERROR_SAVE_FAILED = 'wusong8899-user-submission.forum.save-error';
    public const ERROR_SUBMISSION_IN_REVIEW = 'wusong8899-user-submission.forum.submission-in-review';
    public const ERROR_UNAUTHORIZED = 'wusong8899-user-submission.forum.unauthorized';
    public const ERROR_NOT_FOUND = 'wusong8899-user-submission.forum.not-found';
    public const ERROR_DELETE_FAILED = 'wusong8899-user-submission.forum.delete-error';
    public const ERROR_INVALID_AMOUNT = 'wusong8899-user-submission.lib.error.invalid_amount';
    public const ERROR_INVALID_USER_ACCOUNT = 'wusong8899-user-submission.lib.error.invalid_user_account';
    public const ERROR_VALIDATION_FAILED = 'wusong8899-user-submission.lib.error.validation_failed';

    // Database table name and fields
    public const TABLE_NAME = 'wusong8899_user_submission';
    public const FIELD_ID = 'id';
    public const FIELD_AMOUNT = 'amount';
    public const FIELD_USER_ACCOUNT = 'user_account';
    public const FIELD_SUBMISSION_USER_ID = 'submission_user_id';
    public const FIELD_REVIEW_USER_ID = 'review_user_id';
    public const FIELD_REVIEW_RESULT = 'review_result';
    public const FIELD_ASSIGNED_AT = 'assigned_at';
    public const FIELD_REVIEWED_AT = 'reviewed_at';
    public const FIELD_CREATED_AT = 'created_at';
    public const FIELD_UPDATED_AT = 'updated_at';

    // API endpoints
    public const API_ENDPOINT_LIST = '/api/userSubmissionList';
    public const API_ENDPOINT_APPLICATION = '/api/userSubmissionApplicationList';
    public const API_ENDPOINT_CREATE = '/api/userSubmissionList';
    public const API_ENDPOINT_UPDATE = '/api/userSubmissionList/{id}';
    public const API_ENDPOINT_DELETE = '/api/userSubmissionList/{id}';

    // HTTP status codes
    public const HTTP_OK = 200;
    public const HTTP_CREATED = 201;
    public const HTTP_NO_CONTENT = 204;
    public const HTTP_BAD_REQUEST = 400;
    public const HTTP_UNAUTHORIZED = 401;
    public const HTTP_FORBIDDEN = 403;
    public const HTTP_NOT_FOUND = 404;
    public const HTTP_UNPROCESSABLE_ENTITY = 422;
    public const HTTP_INTERNAL_SERVER_ERROR = 500;

    // Configuration keys
    public const CONFIG_DEFAULT_TIMEZONE = 'user_submission.default_timezone';
    public const CONFIG_MAX_SUBMISSIONS_PER_USER = 'user_submission.max_submissions_per_user';
    public const CONFIG_AUTO_APPROVE_ENABLED = 'user_submission.auto_approve_enabled';
    public const CONFIG_NOTIFICATION_ENABLED = 'user_submission.notification_enabled';

    // Default timezone
    public const DEFAULT_TIMEZONE = 'Asia/Shanghai';

    // Default limits
    public const DEFAULT_PAGINATION_LIMIT = 20;
    public const MAX_PAGINATION_LIMIT = 100;
    public const DEFAULT_MAX_SUBMISSIONS_PER_USER = 10;

    // Permission keys
    public const PERMISSION_DELETE_OWN = 'user-submission.delete-own';
    public const PERMISSION_DELETE_ANY = 'user-submission.delete-any';
    public const PERMISSION_REVIEW = 'user-submission.review';
    public const PERMISSION_VIEW_ALL = 'user-submission.view-all';
    public const PERMISSION_CREATE = 'user-submission.create';

    // Cache keys
    public const CACHE_PREFIX = 'user_submission';
    public const CACHE_USER_SUBMISSIONS = 'user_submissions_user_';
    public const CACHE_PENDING_COUNT = 'pending_submissions_count';
    public const CACHE_TTL = 300; // 5 minutes

    // Notification types
    public const NOTIFICATION_SUBMISSION_APPROVED = 'userSubmissionApproved';
    public const NOTIFICATION_SUBMISSION_REJECTED = 'userSubmissionRejected';
    public const NOTIFICATION_NEW_SUBMISSION = 'newUserSubmission';

    private function __construct()
    {
        // Prevent instantiation
    }
}
