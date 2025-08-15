import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/components/ExtensionPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Button from 'flarum/components/Button';
import UserSubmissionListItem from './UserSubmissionListItem';
import { UserSubmissionData } from '../../types';

export default class UserSubmissionSettingsPage extends ExtensionPage {
  private loading: boolean = true;
  private moreResults: boolean = false;
  private userSubmissionList: UserSubmissionData[] = [];

  oninit(attrs: any) {
    super.oninit(attrs);
    this.loading = true;
    this.moreResults = false;
    this.userSubmissionList = [];
    this.loadResults();
  }

  content() {
    let loading: any;

    if (this.loading) {
      loading = LoadingIndicator.component({ size: "large" });
    }

    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">

          <ul style="padding:0px;list-style-type: none;">
            {this.userSubmissionList.map((itemData) => {
              return (
                <li itemID={itemData.id()} style="margin-top:5px;background: var(--body-bg);">
                  {UserSubmissionListItem.component({ itemData })}
                </li>
              );
            })}
          </ul>

          {!this.loading && this.userSubmissionList.length === 0 && (
            <div>
              <div style="font-size:1.4em;color: var(--muted-more-color);text-align: center;line-height: 100px;">
                {app.translator.trans("wusong8899-user-submission.lib.list-empty")}
              </div>
            </div>
          )}

          {!loading && this.hasMoreResults() && (
            <div style="text-align:center;padding:20px">
              <Button className={'Button Button--primary'} disabled={this.loading} loading={this.loading} onclick={() => this.loadMore()}>
                {app.translator.trans('wusong8899-user-submission.lib.list-load-more')}
              </Button>
            </div>
          )}

          {loading && <div className="UserSubmission-loadMore">{loading}</div>}

        </div>
      </div>
    );
  }
  
  private hasMoreResults(): boolean {
    return this.moreResults;
  }

  private loadMore(): void {
    this.loading = true;
    this.loadResults(this.userSubmissionList.length);
  }

  private parseResults(results: UserSubmissionData[]): UserSubmissionData[] {
    this.moreResults = !!(results as any).payload?.links?.next;
    this.userSubmissionList.push(...results);

    this.loading = false;
    m.redraw();

    return results;
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
