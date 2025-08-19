import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ListContainer from '../../common/components/ListContainer';
import UserSubmissionListItem from './UserSubmissionListItem';
import { UserSubmissionData } from '../../types';
import { createPaginationState, parseResults } from '../../common/hooks/usePagination';
import m from 'mithril';

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
  
  private async loadMore(): Promise<void> {
    try {
      await this.pagination.loadMore((offset) => this.loadResults(offset));
      // Force redraw after successful load
      m.redraw();
    } catch (error) {
      console.error('Failed to load more results:', error);
      // Force redraw after error too
      m.redraw();
    }
  }

  private parseResults(results: UserSubmissionData[]): UserSubmissionData[] {
    return parseResults(this.pagination, results);
  }

  private async loadResults(offset: number = 0): Promise<UserSubmissionData[]> {
    try {
      const results = await app.store.find("userSubmissionList", {
        page: {
          offset
        },
      });
      
      return this.parseResults(results as UserSubmissionData[]);
    } catch (error) {
      console.error('Failed to load user submissions:', error);
      this.pagination.setLoading(false);
      m.redraw(); // Ensure UI updates after error
      return [];
    }
  }

}
