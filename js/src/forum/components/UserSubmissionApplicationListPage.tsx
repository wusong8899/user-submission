import Component, { ComponentAttrs } from "flarum/common/Component";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import app from "flarum/forum/app";
import { UserSubmissionData } from "../../types";
import UserSubmissionApplicationListItem from "./UserSubmissionApplicationListItem";
import m from "mithril";

interface UserSubmissionApplicationListPageAttrs extends ComponentAttrs {
  params: {
    user: any;
  };
}

export default class UserSubmissionApplicationListPage extends Component<UserSubmissionApplicationListPageAttrs> {
  private submissions: UserSubmissionData[] = [];
  private loading = true;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.loadSubmissions();
  }

  view() {
    return (
      <div className="UserSubmissionApplicationList">
        {this.loading ? (
          <LoadingIndicator size="large" />
        ) : (
          <div className="UserSubmissionApplicationList-items">
            {this.submissions.length === 0 ? (
              <div className="EmptyState">
                <p>{app.translator.trans('wusong8899-user-submission.forum.no_applications')}</p>
              </div>
            ) : (
              this.submissions.map((submission) => 
                UserSubmissionApplicationListItem.component({ 
                  key: submission.id(), 
                  itemData: submission 
                })
              )
            )}
          </div>
        )}
      </div>
    );
  }

  private async loadSubmissions(): Promise<void> {
    try {
      this.loading = true;
      m.redraw();

      // Load user's applications
      const results = await app.store.find("userSubmissionApplicationList", {
        page: { limit: 50 }
      });

      // Handle the results
      if (Array.isArray(results)) {
        this.submissions = results as UserSubmissionData[];
      } else if (results && (results as any).data) {
        this.submissions = (results as any).data as UserSubmissionData[];
      } else {
        this.submissions = [];
      }

    } catch (error) {
      console.error('Failed to load user applications:', error);
      this.submissions = [];
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
}
