<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Model;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * User Submission Model
 *
 * @property int $id
 * @property float $amount
 * @property string $user_account
 * @property int $submission_user_id
 * @property int|null $review_user_id
 * @property int|null $review_result
 * @property Carbon|null $assigned_at
 * @property Carbon|null $reviewed_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class UserSubmission extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = UserSubmissionConstants::TABLE_NAME;
    
    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = true;

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'amount' => 'float',
        'submission_user_id' => 'integer',
        'review_user_id' => 'integer',
        'review_result' => 'integer',
        'assigned_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'amount',
        'user_account',
        'submission_user_id',
        'assigned_at',
    ];

    /**
     * Get the user who submitted this submission
     */
    public function fromUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submission_user_id', 'id');
    }

    /**
     * Get the user who reviewed this submission
     */
    public function reviewUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'review_user_id', 'id');
    }

    /**
     * Check if submission is pending review
     */
    public function isPending(): bool
    {
        return $this->review_result === null && $this->review_user_id === null;
    }

    /**
     * Check if submission is approved
     */
    public function isApproved(): bool
    {
        return $this->review_result === UserSubmissionConstants::REVIEW_RESULT_APPROVED;
    }

    /**
     * Check if submission is rejected
     */
    public function isRejected(): bool
    {
        return $this->review_result === UserSubmissionConstants::REVIEW_RESULT_REJECTED;
    }

    /**
     * Get review status as string
     */
    public function getReviewStatusAttribute(): string
    {
        return match ($this->review_result) {
            UserSubmissionConstants::REVIEW_RESULT_APPROVED => UserSubmissionConstants::REVIEW_STATUS_APPROVED,
            UserSubmissionConstants::REVIEW_RESULT_REJECTED => UserSubmissionConstants::REVIEW_STATUS_REJECTED,
            default => UserSubmissionConstants::REVIEW_STATUS_PENDING,
        };
    }
}
