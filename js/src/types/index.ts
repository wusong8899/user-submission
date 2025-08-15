import User from 'flarum/models/User';

/**
 * User Submission model interface
 */
export interface UserSubmissionAttributes {
  id: string;
  amount: number;
  platform: string;
  platform_account: string;
  user_account: string;
  submission_user_id: string;
  review_user_id: string | null;
  review_result: 'pending' | 'approved' | 'rejected' | null;
  assigned_at: Date | null;
  reviewed_at: Date | null;
}

/**
 * User Submission model with relationships
 */
export interface UserSubmissionData extends UserSubmissionAttributes {
  fromUser: User;
  reviewUser: User | null;
}

/**
 * API response for user submission list
 */
export interface UserSubmissionListResponse {
  data: UserSubmissionData[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

/**
 * API request payload for creating user submission
 */
export interface CreateUserSubmissionPayload {
  amount: number;
  platform: string;
  platformAccount: string;
  userAccount: string;
}

/**
 * API request payload for updating user submission
 */
export interface UpdateUserSubmissionPayload {
  review_result?: 'approved' | 'rejected';
  review_user_id?: string;
}

/**
 * Component props for modals
 */
export interface ModalProps {
  onsubmit?: () => void;
  onhide?: () => void;
}

/**
 * Component props for user submission components
 */
export interface UserSubmissionComponentProps {
  userSubmission: UserSubmissionData;
  onUpdate?: (userSubmission: UserSubmissionData) => void;
  onDelete?: (id: string) => void;
}

/**
 * Stream type for form inputs
 */
export type StreamType<T> = {
  (): T;
  (value: T): T;
};

/**
 * Form state interface
 */
export interface UserSubmissionFormState {
  amount: StreamType<string>;
  platform: StreamType<string>;
  platformAccount: StreamType<string>;
  userAccount: StreamType<string>;
  loading: boolean;
}

/**
 * Review modal state interface
 */
export interface ReviewModalState {
  reviewResult: StreamType<string>;
  loading: boolean;
}
