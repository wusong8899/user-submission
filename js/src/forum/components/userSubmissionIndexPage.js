import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import Button from 'flarum/components/Button';

import userSubmissionApplicationModal from './userSubmissionApplicationModal';
import LogInModal from "flarum/components/LogInModal";

export default class userSubmissionIndexPage extends Page {
  oninit(vnode) {
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
            <div style="display: flex;align-items: center;padding-top: 10px;font-weight: bold;font-size: 14px;">
              <img style="width:24px;" src="https://mutluresim.com/images/2023/03/26/ViOux.png" />&nbsp;{app.translator.trans("wusong8899-user-submission.forum.item-header")}
            </div>
            <div style="padding-top: 10px;position:relative">
              <div style="position: absolute;height: 37px;width: 100%;z-index: 1;" onclick={() => this.openModal()}></div>
              <div style="width:100%" class="Search-input">
                <input disabled style="width: 100%;font-size:12px;" class="FormControl" type="search" placeholder={app.translator.trans('wusong8899-user-submission.forum.item-input-placeholder')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  openModal(){
    if(app.session.user){
      app.modal.show(userSubmissionApplicationModal);
    }else{
      app.modal.show(LogInModal);
    }
  }
}
