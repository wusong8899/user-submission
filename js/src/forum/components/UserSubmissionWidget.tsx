import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import UserSubmissionApplicationModal from './UserSubmissionApplicationModal';
import LogInModal from 'flarum/forum/components/LogInModal';
import m from 'mithril';

interface UserSubmissionWidgetAttrs extends ComponentAttrs {}

/**
 * Modernized Widget component for user submission application
 * Uses single rendering path with DOM manipulation for better maintainability
 */
export default class UserSubmissionWidget extends Component<UserSubmissionWidgetAttrs> {
  private static readonly POLL_INTERVAL = 10; // milliseconds
  private static readonly WIDGET_CLASS = 'UserSubmissionApplication';
  private static readonly CONTAINER_SELECTOR = '.TagsPage'; // 当使用 flarum-header-advertisement ，改为splideTagContainer
  
  private widgetElement?: HTMLElement;

  oncreate(vnode: any) {
    super.oncreate(vnode);
    this.setupDynamicWidget();
  }

  onremove() {
    // Cleanup dynamic widget when component is removed
    if (this.widgetElement) {
      this.widgetElement.remove();
    }
  }

  view() {
    // This view method is for potential direct usage
    return this.renderWidgetContent();
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
   * Setup dynamic widget injection with modern DOM manipulation
   */
  private setupDynamicWidget(): void {
    const pollForContainer = setInterval(() => {
      const container = document.querySelector(UserSubmissionWidget.CONTAINER_SELECTOR);
      
      if (container && !container.classList.contains(UserSubmissionWidget.WIDGET_CLASS)) {
        clearInterval(pollForContainer);
        this.injectWidgetAfterContainer(container);
      }
    }, UserSubmissionWidget.POLL_INTERVAL);

    // Cleanup timer if component is removed
    setTimeout(() => clearInterval(pollForContainer), 5000); // Max 5 seconds
  }

  /**
   * Inject widget using modern DOM APIs and Mithril rendering
   */
  private injectWidgetAfterContainer(container: Element): void {
    container.classList.add(UserSubmissionWidget.WIDGET_CLASS);
    
    // Create widget container
    this.widgetElement = document.createElement('div');
    this.widgetElement.className = 'user-submission-widget-dynamic';
    
    // Insert after container
    container.parentNode?.insertBefore(this.widgetElement, container.nextSibling);
    
    // Render widget content using Mithril
    m.render(this.widgetElement, this.renderWidgetContent());
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
