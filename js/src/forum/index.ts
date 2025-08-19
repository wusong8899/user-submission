import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import NotificationGrid from "flarum/components/NotificationGrid";
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import UserSubmissionWidget from './components/UserSubmissionWidget';

import UserSubmission from "./model/UserSubmission";
import addUserPage from './addUserPage';
import UserSubmissionNotification from "./components/UserSubmissionNotification";
import UserSubmissionIndexPage from './components/UserSubmissionIndexPage';

app.initializers.add('wusong8899-user-submission', () => {
  app.routes['userSubmission'] = {
    path: '/userSubmission',
    component: UserSubmissionIndexPage,
  };

  app.store.models.userSubmissionList = UserSubmission;
  app.notificationComponents.userSubmissionList = UserSubmissionNotification;

  extend(HeaderPrimary.prototype, 'view', function (original) {
      const routeName = app.current.get('routeName');

      if (routeName === 'tags') {
        // Initialize the user submission widget for the tags page
        const widget = new UserSubmissionWidget();
        widget.oncreate({});
      }

      return original();
  });

  extend(NotificationGrid.prototype, "notificationTypes", function (items) {
    items.add("userSubmissionList", {
      name: "userSubmissionList",
      icon: "fas fa-file-signature",
      label: app.translator.trans(
        "wusong8899-user-submission.forum.notification-submission-result"
      ),
    });
  });

  addUserPage();
});

