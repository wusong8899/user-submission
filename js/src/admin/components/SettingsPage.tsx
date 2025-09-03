import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import UserSubmissionListItem from './UserSubmissionListItem';
import { UserSubmissionData } from '../../types';
import m,{Vnode} from 'mithril';


export default class UserSubmissionSettingsPage extends ExtensionPage {
  private submissions: UserSubmissionData[] = [];
  public loading = true;

  oninit(vnode: Vnode) {
    super.oninit(vnode);
    this.loadSubmissions();
  }

  content() {
    return (
      <div className="ExtensionPage-settings">
        <div className="container">
          <h2>用户提交管理</h2>

          <div className="Form">
            {this.buildSettingComponent({
              setting: 'wusong8899-user-submission.item_header',
              type: 'text',
              label: app.translator.trans('wusong8899-user-submission.admin.setting.item_header_label'),
              help: app.translator.trans('wusong8899-user-submission.admin.setting.item_header_help'),
            })}

            <div className="Form-group">
              {this.submitButton()}
            </div>
          </div>

          {this.loading ? (
            <LoadingIndicator size="large" />
          ) : (
            <div className="UserSubmissionList">
              {this.submissions.length === 0 ? (
                <div className="EmptyState">
                  <p>暂无提交记录</p>
                </div>
              ) : (
                <div className="UserSubmissionList-items">
                  {this.submissions.map((submission: UserSubmissionData) => 
                    <UserSubmissionListItem 
                      key={submission.id()} 
                      itemData={submission} 
                    />
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
      // Remove immediate redraw to avoid rendering conflicts

      // Load all submissions (or first 50)
      const results = await app.store.find("userSubmissionList", {
        page: { limit: 50 }
      });

      // Handle the results - they might be wrapped or direct array
      if (Array.isArray(results)) {
        this.submissions = results as unknown as UserSubmissionData[];
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
      // Use setTimeout to avoid synchronous redraw issues
      setTimeout(() => m.redraw(), 0);
    }
  }
}
