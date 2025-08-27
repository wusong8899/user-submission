import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { UserSubmissionData } from '../../types';

interface UserSubmissionReviewModalAttrs {
  itemData: UserSubmissionData;
}

export default class UserSubmissionReviewModal extends Modal<UserSubmissionReviewModalAttrs> {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  private itemData!: UserSubmissionData;
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.itemData = this.attrs.itemData;
    this.loading = false;
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-user-submission.admin.submission-review');
  }

  content() {
    //
    return (
      <div className="Modal-body">
        <div className="Form-group user-submission-admin__modal-form-group">
          <Button
            className="Button Button--primary user-submission-admin__modal-button"
            disabled={this.loading}
            onclick={(e: Event) => {
              this.reviewConfirm(e, 'approved');
            }}
          >
            {app.translator.trans('wusong8899-user-submission.lib.accept')}
          </Button>&nbsp;
          <Button
            className="Button Button--danger user-submission-admin__modal-button"
            disabled={this.loading}
            onclick={(e: Event) => {
              this.reviewConfirm(e, 'rejected');
            }}
          >
            {app.translator.trans('wusong8899-user-submission.lib.decline')}
          </Button>&nbsp;
          <Button
            className="Button user-submission-admin__modal-button"
            disabled={this.loading}
            onclick={() => {
              this.hide();
            }}
          >
            {app.translator.trans('wusong8899-user-submission.lib.cancel')}
          </Button>
        </div>
      </div>
    );
  }

  private reviewConfirm(e: Event, value: 'approved' | 'rejected'): void {
    e.preventDefault();

    this.loading = true;
    
    app.request({
      method: 'PATCH',
      url: app.forum.attribute('apiUrl') + '/userSubmissionList/' + this.itemData.id(),
      body: {
        data: {
          type: 'userSubmissionList',
          id: this.itemData.id(),
          attributes: {
            reviewResult: value,
          }
        }
      }
    })
    .then(() => {
      this.hide();
      this.loading = false;
      // Refresh the page to show updated status
      window.location.reload();
    })
    .catch((error) => {
      this.loading = false;
      // Show error message to user
      const errorMessage = error.message || app.translator.trans('wusong8899-user-submission.admin.review-failed');
      alert(errorMessage);
    });
  }
}
