import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class UserSubmissionApplicationSubmitSuccessModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode: any) {
    super.oninit(vnode);
  }

  className(): string {
    return 'Modal--small';
  }

  title(): string {
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
