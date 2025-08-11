import Component from "flarum/Component";
import Button from 'flarum/components/Button';
import UserSubmissionReviewModal from './UserSubmissionReviewModal';
import username from "flarum/helpers/username";

export default class UserSubmissionListItem extends Component {

  view() {
    const {itemData} = this.attrs;
    const moneyName = app.forum.attribute('antoinefr-money.moneyname') || '[money]';

    const amount = itemData.amount();
    const platform = itemData.platform();
    const platformAccount = itemData.platform_account();
    const userAccount = itemData.user_account();
    const fromUser = itemData.fromUser();
    const reviewUser = itemData.reviewUser();
    const reviewResult = itemData.review_result();
    const reviewResultText = app.translator.trans(reviewResult===1?'wusong8899-user-submission.lib.list-submission-accept':'wusong8899-user-submission.lib.list-submission-decline');
    const assignedAt = itemData.assigned_at();
    const reviewedAt = itemData.reviewed_at();

    // const bidText = moneyName.replace('[money]', bidValue);

    return (
      <div className="biddingRankSettingContainer">
        <div style="float:right">
          {reviewedAt && (
            <div style="padding:0px 0px 5px 5px">
              {Button.component({
                style: "font-weight:bold;",
                disabled: true,
                className: 'Button',
              },
              app.translator.trans('wusong8899-user-submission.admin.list-reviewed')
              )}
            </div>
          )}
          {!reviewedAt && (
            <div style="padding:0px 0px 5px 5px">
              {Button.component({
                style: "font-weight:bold;",
                className: 'Button Button--primary',
                onclick: (e) => {
                  this.reviewItem(itemData)
                }
              },
              app.translator.trans('wusong8899-user-submission.admin.list-review')
              )}
            </div>
          )}
        </div>
        <div>
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-username')}: </b>
          {username(fromUser)}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-amount')}: </b>
          {amount}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-assignedAt')}: </b>
          {assignedAt}
        </div>
        <div>
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
            {reviewResultText}&nbsp;|&nbsp;
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewAt')}: </b>
            {reviewedAt}
          </div>
        )}
      </div>
    );
  }

  reviewItem(itemData){
    app.modal.show(UserSubmissionReviewModal, {itemData});
  }
}
