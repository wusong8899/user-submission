<?php

use Flarum\Extend;
use wusong8899\userSubmission\Controllers\UserSubmissionController;
use wusong8899\userSubmission\Controllers\ListUserSubmissionController;
use wusong8899\userSubmission\Controllers\ListUserApplicationController;
use wusong8899\userSubmission\Controllers\UserSubmissionUpdateController;
use wusong8899\userSubmission\Controllers\UserSubmissionAddController;
use wusong8899\userSubmission\Notification\UserSubmissionBlueprint;
use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less')
        ->route('/userSubmission', 'userSubmission.index', UserSubmissionController::class),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Routes('api'))
        ->get('/userSubmissionList', 'userSubmission.get', ListUserSubmissionController::class)
        ->get('/userSubmissionApplicationList', 'userSubmissionApplication.get', ListUserApplicationController::class)
        ->post('/userSubmissionList', 'userSubmission.add', UserSubmissionAddController::class)
        ->patch('/userSubmissionList/{id}', 'userSubmission.update', UserSubmissionUpdateController::class),

    (new Extend\Notification())
        ->type(UserSubmissionBlueprint::class, UserSubmissionSerializer::class, ['alert']),
];

return $extend;
