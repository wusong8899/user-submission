import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import NotificationGrid from "flarum/components/NotificationGrid";
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import userSubmissionApplicationModal from './components/userSubmissionApplicationModal';
import LogInModal from "flarum/components/LogInModal";

import UserSubmission from "./model/UserSubmission";
import addUserPage from './addUserPage';
import UserSubmissionNotification from "./components/userSubmissionNotification";
import userSubmissionIndexPage from './components/userSubmissionIndexPage';

app.initializers.add('wusong8899-user-submission', () => {
  app.routes['userSubmission'] = {
    path: '/userSubmission',
    component: userSubmissionIndexPage,
  };

  app.store.models.userSubmissionList = UserSubmission;
  app.notificationComponents.userSubmissionList = UserSubmissionNotification;

  extend(HeaderPrimary.prototype, 'view', function (vnode) {
      const routeName = app.current.get('routeName');

      if(routeName){
          if(routeName!=="tags"){
          }else{
            let task = setInterval(function(){
                if($(".swiperTagContainer").length>0){
                    clearInterval(task);

                    if(!$(".swiperTagContainer").hasClass("UserSubmissionApplication")){
                      let html = '<div style="display: flex;align-items: center;font-weight: bold;font-size: 14px;">'+
                                    '  <img style="width:22px;" src="https://mutluresim.com/images/2023/04/04/jyzez.png" />&nbsp;&nbsp;'+app.translator.trans("wusong8899-user-submission.forum.item-header")+
                                    '</div>'+
                                    '<div style="padding-top: 10px;position:relative">'+
                                    '  <div class="UserSubmissionApplicationInput" style="position: absolute;height: 37px;width: 100%;z-index: 1;"></div>'+
                                    '  <div style="width:100%" class="Search-input">'+
                                    '    <input disabled style="width: 100%;font-size:12px;" class="FormControl" type="search" placeholder="'+app.translator.trans('wusong8899-user-submission.forum.item-input-placeholder')+'" />'+
                                    '  </div>'+
                                    '</div>';

                      $(html).insertAfter(".swiperTagContainer");
                      $(".swiperTagContainer").addClass("UserSubmissionApplication");

                      $(".UserSubmissionApplicationInput").on("click",function(){
                        if(app.session.user){
                          app.modal.show(userSubmissionApplicationModal);
                        }else{
                          app.modal.show(LogInModal);
                        }
                      });
                    }
                }
            },10);
          }
      }
  });

  extend(NotificationGrid.prototype, "notificationTypes", function (items) {
    items.add("userSubmissionList", {
      name: "userSubmissionList",
      icon: "fas fa-file-signature",
      label: app.translator.trans(
        "wusong8899-user-submission.forum.notification-submission-result"
      ),
    });
  });

  addUserPage();
});

