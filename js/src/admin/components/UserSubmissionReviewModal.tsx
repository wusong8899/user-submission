import app from 'flarum/admin/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
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
        <div className="Form-group" style="text-align: center;">
          {Button.component(
            {
              style: 'min-width:66px;',
              className: 'Button Button--primary',
              disabled: this.loading,
              onclick: (e: Event) => {
                this.reviewConfirm(e, 'approved');
              }
            },
            app.translator.trans('wusong8899-user-submission.lib.accept')
          )}&nbsp;
          {Button.component(
            {
              style: 'min-width:66px;',
              className: 'Button Button--danger',
              disabled: this.loading,
              onclick: (e: Event) => {
                this.reviewConfirm(e, 'rejected');
              }
            },
            app.translator.trans('wusong8899-user-submission.lib.decline')
          )}&nbsp;
          {Button.component(
            {
              style: 'min-width:66px;',
              className: 'Button',
              disabled: this.loading,
              onclick: () => {
                this.hide();
              }
            },
            app.translator.trans('wusong8899-user-submission.lib.cancel')
          )}
        </div>
      </div>
    );
  }

  private reviewConfirm(e: Event, value: 'approved' | 'rejected'): void {
    e.preventDefault();

    this.loading = true;
    this.itemData.save({
      reviewResult: value,
    })
    .then(() => {
      this.hide();
      this.loading = false;
    })
    .catch(() => {
      this.loading = false;
    });
  }
}
