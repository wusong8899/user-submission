import app from 'flarum/admin/app';
import SettingsPage from './components/SettingsPage';
import UserSubmission from "../forum/model/UserSubmission";

app.initializers.add('wusong8899-user-submission', () => {
  app.store.models.userSubmissionList = UserSubmission;
  app.extensionData
    .for('wusong8899-user-submission')
    .registerPage(SettingsPage);
});
