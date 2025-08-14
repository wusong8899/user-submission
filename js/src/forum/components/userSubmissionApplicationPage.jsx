import UserPage from "flarum/components/UserPage";
import userSubmissionApplicationListPage from "./userSubmissionApplicationListPage";

export default class userSubmissionApplicationPage extends UserPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.loadUser(m.route.param("username"));
  }

  content() {
    if(app.session.user){
      const currentUserID = app.session.user.id();
      const targetUserID = this.user.id();

      if(currentUserID===targetUserID){
        return (
          <div>
            {userSubmissionApplicationListPage.component({
              params: {
                user: this.user,
              },
            })}
          </div>
        );
      }
    }
  }
}
