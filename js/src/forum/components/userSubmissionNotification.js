import app from 'flarum/forum/app';
import Notification from "flarum/components/Notification";

export default class userSubmissionNotification extends Notification {
  icon() {
    return null;
  }

  href() {
    return app.route("user.userSubmissionApplication", {
      username: app.session.user.username(),
    });
  }

  content() {
    const notification = this.attrs.notification.subject();
    return app.translator.trans('wusong8899-user-submission.forum.notification-submission-result-title');
  }

  excerpt() {
    const notification = this.attrs.notification.subject();
    const reviewResult = notification.review_result();
    const submissionId = notification.id();

    if(reviewResult===1){
      return app.translator.trans('wusong8899-user-submission.forum.notification-submission-result-success',{id:submissionId});
    }else if(reviewResult===0){
      return app.translator.trans('wusong8899-user-submission.forum.notification-submission-result-failed',{id:submissionId});
    }
  }
}
