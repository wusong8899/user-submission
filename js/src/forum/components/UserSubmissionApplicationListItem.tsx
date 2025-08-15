import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from "flarum/Component";
import { UserSubmissionData } from "../../types";

interface UserSubmissionApplicationListItemAttrs extends ComponentAttrs {
  itemData: UserSubmissionData;
}

export default class UserSubmissionApplicationListItem extends Component<UserSubmissionApplicationListItemAttrs> {

  view() {
    const { itemData } = this.attrs;

    const amount = itemData.amount();
    const id = itemData.id();
    const platform = itemData.platform();
    const platformAccount = itemData.platform_account();
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
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-platform')}: </b>
          {platform}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-platformAccount')}: </b>
          {platformAccount}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-userAccount')}: </b>
          {userAccount}
        </div>
        {reviewedAt && (
          <div>
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewResult')}: </b>
            {reviewResult === 'rejected' && (
              <span style="color:red">{reviewResultText}&nbsp;|&nbsp;</span>
            )}
            {reviewResult === 'approved' && (
              <span style="color:green">{reviewResultText}&nbsp;|&nbsp;</span>
            )}
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewAt')}: </b>
            {reviewedAt}
          </div>
        )}
        {!reviewedAt && (
          <div>
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewResult')}: </b>
            <span style="color:grey">{app.translator.trans('wusong8899-user-submission.lib.list-submission-reviewing')}</span>
          </div>
        )}
      </div>
    );
  }
}
