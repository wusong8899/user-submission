import { extend } from "flarum/extend";
import UserPage from "flarum/components/UserPage";
import LinkButton from "flarum/components/LinkButton";

import userSubmissionApplicationPage from './components/userSubmissionApplicationPage';

export default function () {
  app.routes["user.userSubmissionApplication"] = {
    path: "/u/:username/userSubmissionApplication",
    component: userSubmissionApplicationPage,
  };

  extend(UserPage.prototype, "navItems", function (items) {
      if(app.session.user){
        const currentUserID = app.session.user.id();
        const targetUserID = this.user.id();

        if(currentUserID==targetUserID){
          items.add(
            "userSubmissionApplication",
            LinkButton.component({
                href: app.route("user.userSubmissionApplication", {
                  username: this.user.username(),
                }),
                icon: "fas fa-file-signature",
              },
              [
                app.translator.trans(
                  "wusong8899-user-submission.forum.application-list-title"
                )
              ]
            ),
            10
          );
        }
      }
  });
}
