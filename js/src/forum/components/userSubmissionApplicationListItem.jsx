import Component from "flarum/Component";

export default class userSubmissionApplicationListItem extends Component {

  view() {
    const {itemData} = this.attrs;

    const amount = itemData.amount();
    const id = itemData.id();
    const platform = itemData.platform();
    const platformAccount = itemData.platform_account();
    const userAccount = itemData.user_account();
    const reviewResult = itemData.review_result();
    const reviewResultText = app.translator.trans(reviewResult===1?'wusong8899-user-submission.lib.list-submission-accept':'wusong8899-user-submission.lib.list-submission-decline');
    const assignedAt = itemData.assigned_at();
    const reviewedAt = itemData.reviewed_at();
    let containerClassName = "userSubmissionApplicationContainer ";

    if(reviewedAt===null){
      containerClassName+="userSubmissionApplicationReviewing";
    }else{
      if(reviewResult===1){
        containerClassName+="userSubmissionApplicationAccepted";
      }else{
        containerClassName+="userSubmissionApplicationDeclined";
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
            {reviewResult===0 && (
              <span style="color:red">{reviewResultText}&nbsp;|&nbsp;</span>
            )}
            {reviewResult===1 && (
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
