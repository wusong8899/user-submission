import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ListContainer from '../../common/components/ListContainer';
import UserSubmissionListItem from './UserSubmissionListItem';
import { UserSubmissionData } from '../../types';
import { createPaginationState, parseResults } from '../../common/hooks/usePagination';

export default class UserSubmissionSettingsPage extends ExtensionPage {
  private pagination = createPaginationState();

  oninit(attrs: any) {
    super.oninit(attrs);
    this.loadResults();
  }

  content() {
    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">
          <ListContainer
            items={this.pagination.items}
            loading={this.pagination.loading}
            hasMore={this.pagination.hasMoreResults()}
            onLoadMore={() => this.loadMore()}
            renderItem={(itemData) => UserSubmissionListItem.component({ itemData })}
            className="user-submission-admin__list"
          />
        </div>
      </div>
    );
  }
  
  private loadMore(): void {
    this.pagination.loadMore((offset) => this.loadResults(offset));
  }

  private parseResults(results: UserSubmissionData[]): UserSubmissionData[] {
    return parseResults(this.pagination, results);
  }

  private loadResults(offset: number = 0): Promise<UserSubmissionData[]> {
    return app.store
      .find("userSubmissionList", {
        page: {
          offset
        },
      })
      .catch(() => [])
      .then(this.parseResults.bind(this));
  }

}
