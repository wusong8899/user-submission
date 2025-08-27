import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import NotificationGrid from "flarum/forum/components/NotificationGrid";
import TagsPage from 'flarum/tags/forum/components/TagsPage';
import UserSubmissionWidget from './components/UserSubmissionWidget';
import m from 'mithril';

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

  // Add UserSubmissionWidget to TagsPage view
  override(TagsPage.prototype, 'view', function (original) {
    try {
      const result = original();
      
      // Add UserSubmissionWidget after the main TagsPage content
      const widget = m(UserSubmissionWidget);
      
      // Insert widget after the main content
      if (Array.isArray(result)) {
        return [...result, widget];
      } else {
        return [result, widget];
      }
    } catch (error) {
      console.error('UserSubmissionWidget integration error:', error);
      // Always fall back to original on error
      return original();
    }
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

