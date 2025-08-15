import app from 'flarum/forum/app';
import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';

import UserSubmissionApplicationModal from './UserSubmissionApplicationModal';
import LogInModal from "flarum/components/LogInModal";

export default class UserSubmissionIndexPage extends Page {
  oninit(vnode: any) {
    super.oninit(vnode);
  }

  view() {
    return (
      <div className="MoneyLeaderboardPage">
        {IndexPage.prototype.hero()}

        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div className="user-submission-header">
              <img
                className="user-submission-icon"
                src="https://mutluresim.com/images/2023/03/26/ViOux.png"
                alt="User Submission"
              />
              &nbsp;{app.translator.trans("wusong8899-user-submission.forum.item-header")}
            </div>
            <div className="user-submission-input-container">
              <div
                className="user-submission-input-overlay"
                onclick={() => this.openModal()}
              />
              <div className="Search-input">
                <input
                  disabled
                  className="FormControl"
                  type="search"
                  placeholder={app.translator.trans('wusong8899-user-submission.forum.item-input-placeholder')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private openModal(): void {
    if (app.session.user) {
      app.modal.show(UserSubmissionApplicationModal);
    } else {
      app.modal.show(LogInModal);
    }
  }
}
