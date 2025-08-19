import Component, { ComponentAttrs } from 'flarum/Component';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import EmptyState from './EmptyState';
import LoadMoreButton from './LoadMoreButton';
import { UserSubmissionData } from '../../types';

interface ListContainerAttrs extends ComponentAttrs {
  items: UserSubmissionData[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  renderItem: (item: UserSubmissionData) => any;
  emptyMessage?: string;
  className?: string;
}

/**
 * Reusable List Container component with loading, empty states, and pagination
 */
export default class ListContainer extends Component<ListContainerAttrs> {
  view() {
    const { 
      items, 
      loading, 
      hasMore, 
      onLoadMore, 
      renderItem, 
      emptyMessage,
      className = 'user-submission-list'
    } = this.attrs;

    return (
      <div>
        <ul className={className}>
          {items.map((item) => (
            <li key={item.id()} className={`${className}__item`}>
              {renderItem(item)}
            </li>
          ))}
        </ul>

        {!loading && items.length === 0 && (
          <EmptyState message={emptyMessage} />
        )}

        <LoadMoreButton 
          loading={loading}
          hasMore={hasMore && !loading}
          onClick={onLoadMore}
        />

        {loading && (
          <div className="UserSubmission-loadMore">
            <LoadingIndicator size="large" />
          </div>
        )}
      </div>
    );
  }
}