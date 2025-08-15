import app from 'flarum/forum/app';
import UserPage from "flarum/components/UserPage";
import UserSubmissionApplicationListPage from "./UserSubmissionApplicationListPage";

export default class UserSubmissionApplicationPage extends UserPage {
  oninit(vnode: any) {
    super.oninit(vnode);
    this.loadUser(m.route.param("username"));
  }

  content() {
    if (app.session.user) {
      const currentUserID = app.session.user.id();
      const targetUserID = this.user.id();

      if (currentUserID === targetUserID) {
        return (
          <div>
            {UserSubmissionApplicationListPage.component({
              params: {
                user: this.user,
              },
            })}
          </div>
        );
      }
    }

    return null;
  }
}
