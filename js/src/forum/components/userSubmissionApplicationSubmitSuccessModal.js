import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class userSubmissionApplicationSubmitSuccessModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
    super.oninit(vnode);
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-user-submission.forum.submit-success');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                loading: this.loading,
                onclick: () => {
                  this.hide();
                },
              },
              app.translator.trans('wusong8899-user-submission.lib.ok')
            )}
          </div>
        </div>
      </div>
    );
  }
}
