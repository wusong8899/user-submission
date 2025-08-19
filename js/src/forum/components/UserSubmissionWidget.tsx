import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/Component';
import UserSubmissionApplicationModal from './UserSubmissionApplicationModal';
import LogInModal from 'flarum/components/LogInModal';

interface UserSubmissionWidgetAttrs extends ComponentAttrs {}

/**
 * Widget component for user submission application
 * Displays on the tags page to allow users to submit applications
 */
export default class UserSubmissionWidget extends Component<UserSubmissionWidgetAttrs> {
  private static readonly POLL_INTERVAL = 10; // milliseconds
  private static readonly WIDGET_CLASS = 'UserSubmissionApplication';
  private static readonly CONTAINER_SELECTOR = '.splideTagContainer';

  oncreate(vnode: any) {
    super.oncreate(vnode);
    this.setupWidget();
  }

  view() {
    return (
      <div className="user-submission-widget">
        <div className="user-submission-header">
          <img 
            className="user-submission-icon"
            src="https://i.mji.rip/2025/08/15/102ee6e187aa177ddfe02364dc82208d.png" 
            alt="User Submission"
          />
          <span className="user-submission-title">
            {app.translator.trans("wusong8899-user-submission.forum.item-header")}
          </span>
        </div>
        <div className="user-submission-input-container">
          <div 
            className="user-submission-input-overlay"
            onclick={this.handleInputClick.bind(this)}
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
    );
  }

  private setupWidget(): void {
    const pollForContainer = setInterval(() => {
      const container = $(UserSubmissionWidget.CONTAINER_SELECTOR);
      
      if (container.length > 0) {
        clearInterval(pollForContainer);
        this.insertWidget(container);
      }
    }, UserSubmissionWidget.POLL_INTERVAL);
  }

  private insertWidget(container: JQuery): void {
    if (!container.hasClass(UserSubmissionWidget.WIDGET_CLASS)) {
      const widgetHtml = this.renderWidgetHtml();
      $(widgetHtml).insertAfter(container);
      container.addClass(UserSubmissionWidget.WIDGET_CLASS);
      this.attachEventHandlers();
    }
  }

  private renderWidgetHtml(): string {
    return `
      <div class="user-submission-header">
        <img class="user-submission-icon" style="width:22px;" src="https://i.mji.rip/2025/08/15/102ee6e187aa177ddfe02364dc82208d.png" />
        <span class="user-submission-title">${app.translator.trans("wusong8899-user-submission.forum.item-header")}</span>
      </div>
      <div class="user-submission-input-container">
        <div class="UserSubmissionApplicationInput" style="position: absolute;height: 37px;width: 100%;z-index: 1;"></div>
        <div style="width:100%" class="Search-input">
          <input disabled style="width: 100%;" class="FormControl" type="search" placeholder="${app.translator.trans('wusong8899-user-submission.forum.item-input-placeholder')}" />
        </div>
      </div>
    `;
  }

  private attachEventHandlers(): void {
    $(".UserSubmissionApplicationInput").on("click", this.handleInputClick.bind(this));
  }

  private handleInputClick(): void {
    if (app.session.user) {
      app.modal.show(UserSubmissionApplicationModal);
    } else {
      app.modal.show(LogInModal);
    }
  }
}
