import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import Stream from 'flarum/utils/Stream';
import Button from 'flarum/components/Button';
import UserSubmissionApplicationSubmitSuccessModal from './UserSubmissionApplicationSubmitSuccessModal';
import { createUserSubmission } from '../services/UserSubmissionAPI';
import { StreamType, CreateUserSubmissionPayload } from '../../types';
import m from 'mithril';

/**
 * Enhanced User Submission Application Modal with modern API integration
 */
export default class UserSubmissionApplicationModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  private loading: boolean = false;
  private error: string | null = null;
  private amount: StreamType<string>;
  private userAccount: StreamType<string>;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.loading = false;
    this.error = null;

    this.amount = Stream("");
    this.userAccount = Stream("");
  }

  className(): string {
    return 'Modal--small';
  }

  title(): string {
    return app.translator.trans('wusong8899-user-submission.forum.item-header');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          {this.error && (
            <div className="Alert Alert--danger">
              <div className="Alert-body">
                {this.error}
              </div>
            </div>
          )}

          <div className="Form-group user-submission-modal__form-group">
              <div>
                <div className="userSubmissionDataLabel">{app.translator.trans('wusong8899-user-submission.lib.list-amount')}</div>
                <input 
                  type="number" 
                  min="0" 
                  step="0.01"
                  disabled={this.loading} 
                  required 
                  className={`FormControl ${this.error && this.error.includes('amount') ? 'FormControl--error' : ''}`}
                  bidi={this.amount} 
                />
              </div>

              <div className="userSubmissionDataLabel">{app.translator.trans('wusong8899-user-submission.lib.list-userAccountFull')}</div>
              <input 
                maxLength="500" 
                disabled={this.loading} 
                required 
                className={`FormControl ${this.error && this.error.includes('userAccount') ? 'FormControl--error' : ''}`}
                bidi={this.userAccount} 
              />
          </div>

          <div className="Form-group user-submission-modal__form-group">
            {Button.component(
              {
                className: 'Button Button--primary user-submission-modal__button',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('wusong8899-user-submission.lib.ok')
            )}
            {Button.component(
              {
                className: 'Button user-submission-modal__button',
                disabled: this.loading,
                onclick: () => {
                  this.hide();
                }
              },
              app.translator.trans('wusong8899-user-submission.lib.cancel')
            )}
          </div>
        </div>
      </div>
    );
  }


  /**
   * Enhanced form submission with comprehensive error handling
   */
  async onsubmit(e: Event): Promise<void> {
    e.preventDefault();

    // Clear previous errors
    this.error = null;
    this.loading = true;
    m.redraw();

    try {
      // Prepare payload with proper typing
      const payload: CreateUserSubmissionPayload = {
        amount: parseFloat(this.amount()) || 0,
        userAccount: this.userAccount().trim()
      };

      // Create submission using unified API
      await createUserSubmission(payload);

      // Success - show success modal
      this.loading = false;
      this.hide();
      app.modal.show(UserSubmissionApplicationSubmitSuccessModal);

    } catch (error: any) {
      // Handle errors gracefully
      this.loading = false;
      this.error = error.message || app.translator.trans('wusong8899-user-submission.lib.error.unknown');
      
      m.redraw();
    }
  }

  /**
   * Clear form data
   */
  private clearForm(): void {
    this.amount("");
    this.userAccount("");
    this.error = null;
  }

  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    this.clearForm();
    this.loading = false;
  }
}
