import app from 'flarum/forum/app';
import Notification from "flarum/forum/components/Notification";

export default class UserSubmissionNotification extends Notification {
  icon(): null {
    return null;
  }

  href(): string {
    return app.route("user.userSubmissionApplication", {
      username: app.session.user.username(),
    });
  }

  content(): string {
    // The subject() call was not being used, removing it
    return app.translator.trans('wusong8899-user-submission.forum.notification-submission-result-title');
  }

  excerpt(): string | undefined {
    const notification = this.attrs.notification.subject();
    const reviewResult = notification.review_result();
    const submissionId = notification.id();

    if (reviewResult === 'approved') {
      return app.translator.trans('wusong8899-user-submission.forum.notification-submission-result-success', { id: submissionId });
    } else if (reviewResult === 'rejected') {
      return app.translator.trans('wusong8899-user-submission.forum.notification-submission-result-failed', { id: submissionId });
    }

    return undefined;
  }
}
