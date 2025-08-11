import ExtensionPage from 'flarum/components/ExtensionPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Button from 'flarum/components/Button';
import UserSubmissionListItem from './UserSubmissionListItem';

export default class DecorationStoreSettings extends ExtensionPage {
  oninit(attrs) {
    super.oninit(attrs);
    this.loading = true;
    this.moreResults = false;
    this.userSubmissionList = [];
    this.loadResults();
  }

  content() {
    let loading;

    if(this.loading){
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

          {!this.loading && this.userSubmissionList.length===0 && (
            <div>
              <div style="font-size:1.4em;color: var(--muted-more-color);text-align: center;line-height: 100px;">{app.translator.trans("wusong8899-decoration-store.lib.list-empty")}</div>
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
  
  hasMoreResults() {
    return this.moreResults;
  }

  loadMore() {
    this.loading = true;
    this.loadResults(this.userSubmissionList.length);
  }

  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    [].push.apply(this.userSubmissionList, results);

    this.loading = false;
    m.redraw();

    return results;
  }

  loadResults(offset = 0) {
    return app.store
      .find("userSubmissionList", {
        page: {
          offset
        },
      })
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }

}
