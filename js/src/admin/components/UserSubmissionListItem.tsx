import app from 'flarum/admin/app';
import Component, { ComponentAttrs } from "flarum/common/Component";
import Button from 'flarum/common/components/Button';
import UserSubmissionReviewModal from './UserSubmissionReviewModal';
import username from "flarum/common/helpers/username";
import { UserSubmissionData } from '../../types';

interface UserSubmissionListItemAttrs extends ComponentAttrs {
  itemData: UserSubmissionData;
}

export default class UserSubmissionListItem extends Component<UserSubmissionListItemAttrs> {

  view() {
    const { itemData } = this.attrs;

    const amount = itemData.amount();
    const userAccount = itemData.user_account();
    const fromUser = itemData.fromUser();
    const reviewResult = itemData.review_result();
    const reviewResultText = app.translator.trans(
      reviewResult === 'approved'
        ? 'wusong8899-user-submission.lib.list-submission-accept'
        : 'wusong8899-user-submission.lib.list-submission-decline'
    );
    const assignedAt = itemData.assigned_at();
    const reviewedAt = itemData.reviewed_at();
    
    // Format dates for display
    const formattedAssignedAt = assignedAt ? new Date(assignedAt).toLocaleString() : '';
    const formattedReviewedAt = reviewedAt ? new Date(reviewedAt).toLocaleString() : '';

    // const bidText = moneyName.replace('[money]', bidValue);

    return (
      <div className="biddingRankSettingContainer">
        <div style="float:right">
          <div style="display: flex; gap: 5px; align-items: center;">
            {reviewedAt && (
              <div>
                <Button
                  style="font-weight:bold;"
                  disabled={true}
                  className="Button"
                >
                  {app.translator.trans('wusong8899-user-submission.admin.list-reviewed')}
                </Button>
              </div>
            )}
            {!reviewedAt && (
              <div>
                <Button
                  style="font-weight:bold;"
                  className="Button Button--primary"
                  onclick={() => {
                    this.reviewItem(itemData)
                  }}
                >
                  {app.translator.trans('wusong8899-user-submission.admin.list-review')}
                </Button>
              </div>
            )}
            <div>
              <Button
                className="Button Button--danger"
                icon="fas fa-trash"
                title={app.translator.trans('wusong8899-user-submission.admin.delete-submission')}
                onclick={() => {
                  this.deleteItem(itemData)
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-username')}: </b>
          {username(fromUser)}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-amount')}: </b>
          {amount}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-assignedAt')}: </b>
          {formattedAssignedAt}
        </div>
        <div>
          <b>{app.translator.trans('wusong8899-user-submission.lib.list-userAccount')}: </b>
          {userAccount}
        </div>
        {reviewedAt && (
          <div>
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewResult')}: </b>
            {reviewResultText}&nbsp;|&nbsp;
            <b>{app.translator.trans('wusong8899-user-submission.lib.list-reviewAt')}: </b>
            {formattedReviewedAt}
          </div>
        )}
      </div>
    );
  }

  private reviewItem(itemData: UserSubmissionData): void {
    app.modal.show(UserSubmissionReviewModal, { itemData });
  }

  private deleteItem(itemData: UserSubmissionData): void {
    if (confirm('确定要删除此申请吗？')) {
      app.request({
        method: 'DELETE',
        url: app.forum.attribute('apiUrl') + '/userSubmissionList/' + itemData.id(),
      })
        .then(() => {
          // Refresh the page or remove the item from the list
          window.location.reload();
        })
        .catch(() => {
          alert('删除失败');
        });
    }
  }
}
