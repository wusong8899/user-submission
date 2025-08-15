import Model from "flarum/Model";
import User from "flarum/models/User";
import { UserSubmissionAttributes } from "../../types";

export default class UserSubmission extends Model<UserSubmissionAttributes> {
  id!: () => string;
  amount!: () => number;
  platform!: () => string;
  platform_account!: () => string;
  user_account!: () => string;
  submission_user_id!: () => string;
  review_user_id!: () => string | null;
  review_result!: () => 'pending' | 'approved' | 'rejected' | null;
  assigned_at!: () => Date | null;
  reviewed_at!: () => Date | null;
  fromUser!: () => User;
  reviewUser!: () => User | null;
}

Object.assign(UserSubmission.prototype, {
  id: Model.attribute("id"),
  amount: Model.attribute("amount"),
  platform: Model.attribute("platform"),
  platform_account: Model.attribute("platform_account"),
  user_account: Model.attribute("user_account"),
  submission_user_id: Model.attribute("submission_user_id"),
  review_user_id: Model.attribute("review_user_id"),
  review_result: Model.attribute("review_result"),
  assigned_at: Model.attribute("assigned_at"),
  reviewed_at: Model.attribute("reviewed_at"),
  fromUser: Model.hasOne("fromUser"),
  reviewUser: Model.hasOne("reviewUser"),
});
