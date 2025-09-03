<?php

use Flarum\Extend;
use wusong8899\userSubmission\Controllers\UserSubmissionController;
use wusong8899\userSubmission\Controllers\ListUserSubmissionController;
use wusong8899\userSubmission\Controllers\ListUserApplicationController;
use wusong8899\userSubmission\Controllers\UserSubmissionUpdateController;
use wusong8899\userSubmission\Controllers\UserSubmissionAddController;
use wusong8899\userSubmission\Controllers\UserSubmissionDeleteController;
use wusong8899\userSubmission\Notification\UserSubmissionBlueprint;
use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Policies\UserSubmissionPolicy;
use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Providers\UserSubmissionServiceProvider;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less')
        ->route('/userSubmission', 'userSubmission.index', UserSubmissionController::class),

    (new Extend\Locales(__DIR__ . '/locale')),

    // Expose admin-configured item header to the forum and set default
    (new Extend\Settings())
        ->default('wusong8899-user-submission.item_header', '')
        ->serializeToForum('userSubmissionItemHeader', 'wusong8899-user-submission.item_header'),

    (new Extend\Routes('api'))
        ->get('/userSubmissionList', 'userSubmission.get', ListUserSubmissionController::class)
        ->get('/userSubmissionApplicationList', 'userSubmissionApplication.get', ListUserApplicationController::class)
        ->post('/userSubmissionList', 'userSubmission.add', UserSubmissionAddController::class)
        ->patch('/userSubmissionList/{id}', 'userSubmission.update', UserSubmissionUpdateController::class)
        ->delete('/userSubmissionList/{id}', 'userSubmission.delete', UserSubmissionDeleteController::class),

    (new Extend\Notification())
        ->type(UserSubmissionBlueprint::class, UserSubmissionSerializer::class, ['alert']),

    (new Extend\Policy())
        ->modelPolicy(UserSubmission::class, UserSubmissionPolicy::class),

    (new Extend\ServiceProvider())
        ->register(UserSubmissionServiceProvider::class),
];

return $extend;
