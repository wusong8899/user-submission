import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from "flarum/common/Component";
import Button from 'flarum/common/components/Button';
import { UserSubmissionData } from "../../types";

interface UserSubmissionApplicationListItemAttrs extends ComponentAttrs {
  itemData: UserSubmissionData;
}

export default class UserSubmissionApplicationListItem extends Component<UserSubmissionApplicationListItemAttrs> {

  view() {
    const { itemData } = this.attrs;

    const amount = itemData.amount();
    const id = itemData.id();
    const userAccount = itemData.user_account();
    const reviewResult = itemData.review_result();
    const reviewResultText = app.translator.trans(
      reviewResult === 'approved'
        ? 'wusong8899-user-submission.lib.list-submission-accept'
        : 'wusong8899-user-submission.lib.list-submission-decline'
    );
    const assignedAt = itemData.assigned_at();
    const reviewedAt = itemData.reviewed_at();
    let containerClassName = "userSubmissionApplicationContainer ";

    if (reviewedAt === null) {
      containerClassName += "userSubmissionApplicationReviewing";
    } else {
      if (reviewResult === 'approved') {
        containerClassName += "userSubmissionApplicationAccepted";
      } else {
        containerClassName += "userSubmissionApplicationDeclined";
      }
    }

    return (
      <div className={containerClassName}>
        <div>
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-id')}: </b>
          {id}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-assignedAt')}: </b>
          {assignedAt}
        </div>
        <div>
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-amount')}: </b>
          {amount}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-userAccount')}: </b>
          {userAccount}
        </div>
        {reviewedAt && (
          <div>
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewResult')}: </b>
            {reviewResult === 'rejected' && (
              <span className="user-submission-status user-submission-status--rejected">{reviewResultText}&nbsp;|&nbsp;</span>
            )}
            {reviewResult === 'approved' && (
              <span className="user-submission-status user-submission-status--approved">{reviewResultText}&nbsp;|&nbsp;</span>
            )}
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewAt')}: </b>
            {reviewedAt}
          </div>
        )}
        {!reviewedAt && (
          <div>
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewResult')}: </b>
            <span className="user-submission-status user-submission-status--reviewing">{app.translator.trans('wusong8899-user-submission.lib.list-submission-reviewing')}</span>
          </div>
        )}
        <div className="user-submission-actions">
          <Button
            className="Button Button--danger Button--small"
            icon="fas fa-trash"
            onclick={() => this.deleteItem(itemData)}
          >
            {app.translator.trans('wusong8899-user-submission.forum.delete-submission')}
          </Button>
        </div>
      </div>
    );
  }

  private deleteItem(itemData: UserSubmissionData): void {
    if (confirm(app.translator.trans('wusong8899-user-submission.forum.confirm-delete'))) {
      app.request({
        method: 'DELETE',
        url: app.forum.attribute('apiUrl') + '/userSubmissionList/' + itemData.id(),
      })
        .then(() => {
          // Refresh the page or remove the item from the list
          window.location.reload();
        })
        .catch(() => {
          alert(app.translator.trans('wusong8899-user-submission.forum.delete-failed'));
        });
    }
  }
}
