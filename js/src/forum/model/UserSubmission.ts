import Model from "flarum/common/Model";
import User from "flarum/common/models/User";
import { UserSubmissionAttributes, UserSubmissionReviewResult, UserSubmissionReviewStatus } from "../../types";

/**
 * Enhanced UserSubmission Model with strict typing and modern Flarum patterns
 */
export default class UserSubmission extends Model<UserSubmissionAttributes> {
  // Core attributes with strict types
  declare id: () => string;
  declare amount: () => number;
  declare user_account: () => string;
  declare submission_user_id: () => string;
  declare review_user_id: () => string | null;
  declare review_result: () => UserSubmissionReviewResult | null;
  declare assigned_at: () => Date;
  declare reviewed_at: () => Date | null;
  declare created_at: () => Date;
  declare updated_at: () => Date;

  // Relationship accessors with proper typing
  declare fromUser: () => User | false;
  declare reviewUser: () => User | null | false;

  /**
   * Check if submission is pending review
   */
  isPending(): boolean {
    return this.review_result() === null && this.review_user_id() === null;
  }

  /**
   * Check if submission is approved
   */
  isApproved(): boolean {
    return this.review_result() === 'approved';
  }

  /**
   * Check if submission is rejected
   */
  isRejected(): boolean {
    return this.review_result() === 'rejected';
  }

  /**
   * Get review status as human-readable string
   */
  getReviewStatus(): UserSubmissionReviewStatus {
    const result = this.review_result();
    if (result === 'approved') return 'approved';
    if (result === 'rejected') return 'rejected';
    return 'pending';
  }

  /**
   * Get formatted amount for display
   */
  getFormattedAmount(): string {
    return this.amount().toFixed(2);
  }

  /**
   * Check if submission can be edited
   */
  canEdit(): boolean {
    return this.isPending();
  }

  /**
   * Get time since submission
   */
  getTimeSinceSubmission(): number {
    return Date.now() - this.created_at().getTime();
  }
}

// Modern attribute and relationship definitions
Object.assign(UserSubmission.prototype, {
  id: Model.attribute("id"),
  amount: Model.attribute("amount", Number),
  user_account: Model.attribute("user_account"),
  submission_user_id: Model.attribute("submission_user_id"),
  review_user_id: Model.attribute("review_user_id"),
  review_result: Model.attribute("review_result"),
  assigned_at: Model.attribute("assigned_at", Model.transformDate),
  reviewed_at: Model.attribute("reviewed_at", Model.transformDate),
  created_at: Model.attribute("created_at", Model.transformDate),
  updated_at: Model.attribute("updated_at", Model.transformDate),

  // Relationships with proper naming for better clarity
  fromUser: Model.hasOne("fromUser"),
  reviewUser: Model.hasOne("reviewUser"),
});
