import app from 'flarum/forum/app';
import { extend } from "flarum/common/extend";
import UserPage from "flarum/forum/components/UserPage";
import LinkButton from "flarum/common/components/LinkButton";

import UserSubmissionApplicationPage from './components/UserSubmissionApplicationPage';

export default function addUserPage(): void {
  app.routes["user.userSubmissionApplication"] = {
    path: "/u/:username/userSubmissionApplication",
    component: UserSubmissionApplicationPage,
  };

  extend(UserPage.prototype, "navItems", function (items) {
    if (app.session.user) {
      const currentUserID = app.session.user.id();
      const targetUserID = this.user.id();

      if (currentUserID === targetUserID) {
        items.add(
          "userSubmissionApplication",
          <LinkButton
            href={app.route("user.userSubmissionApplication", {
              username: this.user.username(),
            })}
            icon="fas fa-file-signature"
          >
            {app.translator.trans(
              "wusong8899-user-submission.forum.application-list-title"
            )}
          </LinkButton>,
          10
        );
      }
    }
  });
}
