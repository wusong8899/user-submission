import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Component, { ComponentAttrs } from 'flarum/common/Component';

interface LoadMoreButtonAttrs extends ComponentAttrs {
  loading: boolean;
  hasMore: boolean;
  onClick: () => void;
}

/**
 * Reusable Load More Button component
 */
export default class LoadMoreButton extends Component<LoadMoreButtonAttrs> {
  view() {
    const { loading, hasMore, onClick } = this.attrs;

    if (!hasMore || loading) {
      return null;
    }

    return (
      <div className="user-submission-load-more-container">
        <Button 
          className="Button Button--primary" 
          disabled={loading} 
          loading={loading} 
          onclick={onClick}
        >
          {app.translator.trans('wusong8899-user-submission.lib.list-load-more')}
        </Button>
      </div>
    );
  }
}