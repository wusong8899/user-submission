import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class UserSubmissionReviewModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
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
              onclick: (e) => {
                this.reviewConfirm(e,1);
              }
            },
            app.translator.trans('wusong8899-user-submission.lib.accept')
          )}&nbsp;
          {Button.component(
            {
              style: 'min-width:66px;',
              className: 'Button Button--danger',
              disabled: this.loading,
              onclick: (e) => {
                this.reviewConfirm(e,0);
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

  reviewConfirm(e,value) {
    e.preventDefault();

    this.loading = true;
    this.itemData.save({
      reviewResult:value,
    })
    .then(
      () => this.hide(),
      (response) => {
        this.loading = false;
      }
    );
  }
}
