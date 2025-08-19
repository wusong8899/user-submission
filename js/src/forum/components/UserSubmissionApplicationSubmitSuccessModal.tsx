import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class UserSubmissionApplicationSubmitSuccessModal extends Modal {
  static isDismissible = true;

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
          <div className="Form-group" style={{ textAlign: 'center' }}>
            <Button
              className="Button Button--primary"
              onclick={() => app.modal.close()}
            >
              {app.translator.trans('wusong8899-user-submission.lib.ok')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
