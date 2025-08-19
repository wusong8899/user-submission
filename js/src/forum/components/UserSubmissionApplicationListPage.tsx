import Component, { ComponentAttrs } from "flarum/common/Component";
import app from "flarum/forum/app";
import { UserSubmissionData } from "../../types";
import ListContainer from "../../common/components/ListContainer";
import UserSubmissionApplicationListItem from "./UserSubmissionApplicationListItem";
import { createPaginationState, parseResults } from "../../common/hooks/usePagination";

interface UserSubmissionApplicationListPageAttrs extends ComponentAttrs {
  params: {
    user: any;
  };
}

export default class UserSubmissionApplicationListPage extends Component<UserSubmissionApplicationListPageAttrs> {
  private pagination = createPaginationState();

  oninit(vnode: any) {
    super.oninit(vnode);
    this.loadResults();
  }

  view() {
    return (
      <ListContainer
        items={this.pagination.items}
        loading={this.pagination.loading}
        hasMore={this.pagination.hasMoreResults()}
        onLoadMore={() => this.loadMore()}
        renderItem={(itemData) => UserSubmissionApplicationListItem.component({ itemData })}
      />
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
      .find("userSubmissionApplicationList", {
        page: {
          offset
        },
      })
      .catch(() => [])
      .then(this.parseResults.bind(this));
  }

}
