import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import UserSubmissionListItem from './UserSubmissionListItem';
import { UserSubmissionData } from '../../types';
import m from 'mithril';

export default class UserSubmissionSettingsPage extends ExtensionPage {
  private submissions: UserSubmissionData[] = [];
  private loading = true;

  oninit(attrs: any) {
    super.oninit(attrs);
    this.loadSubmissions();
  }

  content() {
    return (
      <div className="ExtensionPage-settings">
        <div className="container">
          <h2>{app.translator.trans('wusong8899-user-submission.admin.title', {}, true)}</h2>
          
          {this.loading ? (
            <LoadingIndicator size="large" />
          ) : (
            <div className="UserSubmissionList">
              {this.submissions.length === 0 ? (
                <div className="EmptyState">
                  <p>{app.translator.trans('wusong8899-user-submission.admin.no_submissions', {}, true)}</p>
                </div>
              ) : (
                <div className="UserSubmissionList-items">
                  {this.submissions.map((submission) => 
                    UserSubmissionListItem.component({ 
                      key: submission.id(), 
                      itemData: submission 
                    })
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  private async loadSubmissions(): Promise<void> {
    try {
      this.loading = true;
      m.redraw();

      // Load all submissions (or first 50)
      const results = await app.store.find("userSubmissionList", {
        page: { limit: 50 }
      });

      // Handle the results - they might be wrapped or direct array
      if (Array.isArray(results)) {
        this.submissions = results as UserSubmissionData[];
      } else if (results && (results as any).data) {
        this.submissions = (results as any).data as UserSubmissionData[];
      } else {
        this.submissions = [];
      }

      console.log('Loaded submissions:', this.submissions);
      
    } catch (error) {
      console.error('Failed to load submissions:', error);
      this.submissions = [];
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
}
