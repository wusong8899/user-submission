import app from 'flarum/forum/app';
import {
  UserSubmissionData,
  UserSubmissionListResponse,
  CreateUserSubmissionPayload,
  UpdateUserSubmissionPayload,
  ListParams,
  ValidationError,
  USER_SUBMISSION_CONSTANTS
} from '../../types';

// Constants for the API module
const BASE_ENDPOINT = '/api/userSubmissionList';
const APPLICATION_ENDPOINT = '/api/userSubmissionApplicationList';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // milliseconds

/**
 * List user submissions with advanced filtering and pagination
 */
export async function listUserSubmissions(params: ListParams = {}): Promise<UserSubmissionListResponse> {
  try {
    const queryParams = buildQueryParams(params);
    const response = await requestWithRetry(
      'GET',
      `${BASE_ENDPOINT}${queryParams ? `?${queryParams}` : ''}`
    );
    
    return processListResponse(response);
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch user submissions');
  }
}

/**
 * Get user applications list
 */
export async function listUserApplications(params: ListParams = {}): Promise<UserSubmissionListResponse> {
  try {
    const queryParams = buildQueryParams(params);
    const response = await requestWithRetry(
      'GET',
      `${APPLICATION_ENDPOINT}${queryParams ? `?${queryParams}` : ''}`
    );
    
    return processListResponse(response);
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch user applications');
  }
}

/**
 * Create a new user submission with comprehensive validation
 */
export async function createUserSubmission(payload: CreateUserSubmissionPayload): Promise<UserSubmissionData> {
  try {
    // Client-side validation
    const validationErrors = validateCreatePayload(payload);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.map(err => err.message).join(', '));
    }

    const response = await requestWithRetry('POST', BASE_ENDPOINT, {
      data: {
        type: 'userSubmissionList',
        attributes: payload
      }
    });

    return processCreateResponse(response);
  } catch (error) {
    throw handleApiError(error, 'Failed to create user submission');
  }
}

/**
 * Update an existing user submission
 */
export async function updateUserSubmission(id: string, payload: UpdateUserSubmissionPayload): Promise<UserSubmissionData> {
  try {
    if (!id) {
      throw new Error('Submission ID is required');
    }

    const response = await requestWithRetry('PATCH', `${BASE_ENDPOINT}/${id}`, {
      data: {
        type: 'userSubmissionList',
        id,
        attributes: payload
      }
    });

    return processUpdateResponse(response);
  } catch (error) {
    throw handleApiError(error, 'Failed to update user submission');
  }
}

/**
 * Delete a user submission
 */
export async function deleteUserSubmission(id: string): Promise<void> {
  try {
    if (!id) {
      throw new Error('Submission ID is required');
    }

    await requestWithRetry('DELETE', `${BASE_ENDPOINT}/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Failed to delete user submission');
  }
}

/**
 * Validate create payload on client side
 */
export function validateCreatePayload(payload: CreateUserSubmissionPayload): ValidationError[] {
    const errors: ValidationError[] = [];
    const { VALIDATION_RULES, ERROR_CODES } = USER_SUBMISSION_CONSTANTS;

    // Amount validation
    if (!payload.amount || payload.amount < VALIDATION_RULES.MIN_AMOUNT) {
      errors.push({
        field: 'amount',
        message: app.translator.trans(`wusong8899-user-submission.lib.error.${ERROR_CODES.INVALID_AMOUNT}`)
      });
    }

    if (payload.amount > VALIDATION_RULES.MAX_AMOUNT) {
      errors.push({
        field: 'amount',
        message: app.translator.trans(`wusong8899-user-submission.lib.error.amount_too_large`)
      });
    }

    // User account validation
    if (!payload.userAccount || payload.userAccount.trim().length === 0) {
      errors.push({
        field: 'userAccount',
        message: app.translator.trans(`wusong8899-user-submission.lib.error.user_account_required`)
      });
    }

    if (payload.userAccount && payload.userAccount.length > VALIDATION_RULES.MAX_ACCOUNT_LENGTH) {
      errors.push({
        field: 'userAccount',
        message: app.translator.trans(`wusong8899-user-submission.lib.error.user_account_too_long`)
      });
    }

    return errors;
  }

/**
 * Build query parameters for list requests
 */
function buildQueryParams(params: ListParams): string {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.include) queryParams.append('include', params.include.join(','));
    
    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        queryParams.append(`filter[${key}]`, String(value));
      });
    }

    return queryParams.toString();
  }

/**
 * Make API request with retry logic and enhanced error handling
 */
async function requestWithRetry(
    method: string,
    url: string,
    data?: any,
    retryCount = 0
  ): Promise<any> {
    try {
      const response = await app.request({
        method,
        url,
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      return response;
    } catch (error: any) {
      // Retry logic for network errors
      if (retryCount < MAX_RETRIES && shouldRetry(error)) {
        await delay(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
        return requestWithRetry(method, url, data, retryCount + 1);
      }

      throw error;
    }
  }

/**
 * Determine if error should trigger a retry
 */
function shouldRetry(error: any): boolean {
    // Retry on network errors, timeouts, and 5xx server errors
    if (!error.status) return true; // Network error
    return error.status >= 500 && error.status < 600;
  }

/**
 * Delay helper for retry logic
 */
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

/**
 * Process list response and ensure proper typing
 */
function processListResponse(response: any): UserSubmissionListResponse {
    // Push to store for automatic model hydration
    if (response && Array.isArray(response.data)) {
      response.data.forEach((item: any) => {
        app.store.pushPayload({ data: item });
      });
    }

    return {
      data: response.data || [],
      meta: response.meta || {}
    };
  }

/**
 * Process create response
 */
function processCreateResponse(response: any): UserSubmissionData {
    if (response && response.data) {
      app.store.pushPayload(response);
      return response.data;
    }
    throw new Error('Invalid create response format');
  }

/**
 * Process update response
 */
function processUpdateResponse(response: any): UserSubmissionData {
    if (response && response.data) {
      app.store.pushPayload(response);
      return response.data;
    }
    throw new Error('Invalid update response format');
  }

/**
 * Enhanced error handling with user-friendly messages
 */
function handleApiError(error: any, defaultMessage: string): Error {

    // Handle validation errors from server
    if (error.status === 422 && error.errors) {
      const validationMessages = error.errors
        .map((err: any) => err.detail || err.title)
        .join(', ');
      return new Error(validationMessages);
    }

    // Handle common HTTP status codes
    switch (error.status) {
      case 401:
        return new Error(app.translator.trans('wusong8899-user-submission.lib.error.unauthorized'));
      case 403:
        return new Error(app.translator.trans('wusong8899-user-submission.lib.error.forbidden'));
      case 404:
        return new Error(app.translator.trans('wusong8899-user-submission.lib.error.not_found'));
      case 429:
        return new Error(app.translator.trans('wusong8899-user-submission.lib.error.rate_limited'));
      case 500:
        return new Error(app.translator.trans('wusong8899-user-submission.lib.error.server_error'));
      default:
        return new Error(error.message || defaultMessage);
    }
  }

// Export a default object with all functions for backward compatibility
export default {
  list: listUserSubmissions,
  listApplications: listUserApplications,
  create: createUserSubmission,
  update: updateUserSubmission,
  delete: deleteUserSubmission,
  validate: validateCreatePayload
};