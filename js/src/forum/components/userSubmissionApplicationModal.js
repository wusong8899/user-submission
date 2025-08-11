import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import Stream from 'flarum/utils/Stream';
import Button from 'flarum/components/Button';
import Alert from 'flarum/common/components/Alert';
import userSubmissionApplicationSubmitSuccessModal from './userSubmissionApplicationSubmitSuccessModal';

export default class userSubmissionApplicationModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
    super.oninit(vnode);
    this.loading = false;

    this.amount = Stream("");
    this.platform = Stream("");
    this.platformAccount = Stream("");
    this.userAccount = Stream("");
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-user-submission.forum.item-header');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
              <div>
                <div className="userSubmissionDataLabel">{app.translator.trans('wusong8899-user-submission.lib.list-amount')}</div>
                <input type="number" min="0" disabled={this.loading} required className="FormControl" bidi={this.amount} />
              </div>

              <div className="userSubmissionDataLabel">{app.translator.trans('wusong8899-user-submission.lib.list-platform')}</div>
              <input maxlength="500" disabled={this.loading} required className="FormControl" bidi={this.platform} />

              <div className="userSubmissionDataLabel">{app.translator.trans('wusong8899-user-submission.lib.list-platformAccount')}</div>
              <input maxlength="500" disabled={this.loading} required className="FormControl" bidi={this.platformAccount} />

              <div className="userSubmissionDataLabel">{app.translator.trans('wusong8899-user-submission.lib.list-userAccountFull')}</div>
              <input maxlength="500" disabled={this.loading} required className="FormControl" bidi={this.userAccount} />
          </div>

          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                style:'min-width:66px;',
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('wusong8899-user-submission.lib.ok')
            )}&nbsp;
            {Button.component(
              {
                style:'min-width:66px;',
                className: 'Button',
                loading: this.loading,
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


  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    app.store
    .createRecord("userSubmissionList")
    .save({
      amount:this.amount(),
      platform:this.platform(),
      platformAccount:this.platformAccount(),
      userAccount:this.userAccount()
    })
    .then(
      (result) => {
        app.store.pushPayload(result);
        this.loading = false;
        app.modal.show(userSubmissionApplicationSubmitSuccessModal);
      }
    )
    .catch((e) => {
      this.loading = false;
    });
  }
}
