import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/Component';

interface EmptyStateAttrs extends ComponentAttrs {
  message?: string;
}

/**
 * Reusable Empty State component
 */
export default class EmptyState extends Component<EmptyStateAttrs> {
  view() {
    const { message } = this.attrs;
    const displayMessage = message || app.translator.trans('wusong8899-user-submission.lib.list-empty');

    return (
      <div className="user-submission-empty-state">
        {displayMessage}
      </div>
    );
  }
}