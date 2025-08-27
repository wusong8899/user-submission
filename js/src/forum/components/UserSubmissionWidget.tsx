import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import UserSubmissionApplicationModal from './UserSubmissionApplicationModal';
import LogInModal from 'flarum/forum/components/LogInModal';

interface UserSubmissionWidgetAttrs extends ComponentAttrs {}

/**
 * Modernized Widget component for user submission application
 * Integrated directly into TagsPage view using proper Mithril component lifecycle
 */
export default class UserSubmissionWidget extends Component<UserSubmissionWidgetAttrs> {
  view() {
    // Additional safeguard: only render on tags page
    const routeName = app.current.get('routeName');
    if (routeName !== 'tags') {
      return null;
    }

    return (
      <div className="user-submission-widget-dynamic">
        {this.renderWidgetContent()}
      </div>
    );
  }

  /**
   * Unified widget content rendering using JSX
   */
  private renderWidgetContent() {
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
            className="user-submission-input-container__overlay"
            onclick={this.handleInputClick.bind(this)}
          />
          <div className="user-submission-input-container__search-input Search-input">
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


  /**
   * Enhanced click handler with better error handling
   */
  private handleInputClick(): void {
    try {
      if (app.session.user) {
        app.modal.show(UserSubmissionApplicationModal);
      } else {
        app.modal.show(LogInModal);
      }
    } catch {
      // Silent error handling - could be logged to a service in production
    }
  }
}
