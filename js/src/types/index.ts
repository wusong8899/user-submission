import User from 'flarum/models/User';

/**
 * Review result type - strictly typed enum
 */
export type UserSubmissionReviewResult = 'approved' | 'rejected';

/**
 * Review status type including pending state
 */
export type UserSubmissionReviewStatus = 'pending' | 'approved' | 'rejected';

/**
 * Enhanced User Submission model interface with strict typing
 */
export interface UserSubmissionAttributes {
  readonly id: string;
  amount: number;
  user_account: string;
  submission_user_id: string;
  review_user_id: string | null;
  review_result: UserSubmissionReviewResult | null;
  assigned_at: Date;
  reviewed_at: Date | null;
  created_at: Date;
  updated_at: Date;
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
  userAccount: string;
}

/**
 * API request payload for updating user submission with strict typing
 */
export interface UpdateUserSubmissionPayload {
  review_result?: UserSubmissionReviewResult;
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
  userAccount: StreamType<string>;
  loading: boolean;
}

/**
 * Review modal state interface with strict typing
 */
export interface ReviewModalState {
  reviewResult: StreamType<UserSubmissionReviewResult | ''>;
  loading: boolean;
}

/**
 * Enhanced API response wrapper with error handling
 */
export interface ApiResponse<T = any> {
  data: T;
  meta?: MetaInformation;
  errors?: ApiError[];
}

/**
 * Standardized API error interface
 */
export interface ApiError {
  status: string;
  code?: string;
  title: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
}

/**
 * Meta information from API responses
 */
export interface MetaInformation {
  total?: number;
  page?: number;
  per_page?: number;
  [key: string]: any;
}

/**
 * Validation error type for forms
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Enhanced UserSubmission service interface
 */
export interface UserSubmissionService {
  list(params?: ListParams): Promise<UserSubmissionListResponse>;
  create(payload: CreateUserSubmissionPayload): Promise<UserSubmissionData>;
  update(id: string, payload: UpdateUserSubmissionPayload): Promise<UserSubmissionData>;
  delete(id: string): Promise<void>;
  validate(data: Partial<CreateUserSubmissionPayload>): ValidationError[];
}

/**
 * List parameters for API queries
 */
export interface ListParams {
  page?: number;
  limit?: number;
  filter?: Record<string, any>;
  sort?: string;
  include?: string[];
}

/**
 * Constants for user submission system
 */
export const USER_SUBMISSION_CONSTANTS = {
  REVIEW_RESULTS: {
    APPROVED: 'approved' as const,
    REJECTED: 'rejected' as const,
  },
  REVIEW_STATUSES: {
    PENDING: 'pending' as const,
    APPROVED: 'approved' as const,
    REJECTED: 'rejected' as const,
  },
  VALIDATION_RULES: {
    MIN_AMOUNT: 0.01,
    MAX_AMOUNT: 999999.99,
    MAX_USER_ACCOUNT_LENGTH: 500,
  },
  ERROR_CODES: {
    SUBMISSION_IN_REVIEW: 'submission_in_review',
    INVALID_AMOUNT: 'invalid_amount',
    INVALID_ACCOUNT: 'invalid_account',
    UNAUTHORIZED: 'unauthorized',
    NOT_FOUND: 'not_found',
  }
} as const;
