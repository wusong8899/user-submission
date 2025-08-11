<?php

namespace wusong8899\userSubmission\Controllers;

use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Helpers\CommonHelper;
use wusong8899\userSubmission\Notification\UserSubmissionBlueprint;

use Flarum\User\User;
use Flarum\Notification\NotificationSyncer;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

class UserSubmissionUpdateController extends AbstractCreateController
{
    public $serializer = UserSubmissionSerializer::class;
    protected $translator;
    protected $notifications;

    public function __construct(Translator $translator, NotificationSyncer $notifications)
    {
        $this->translator = $translator;
        $this->notifications = $notifications;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $submissionID = Arr::get($request->getQueryParams(), 'id');

        if (!isset($submissionID)) {
            $errorMessage = 'wusong8899-user-submission.forum.save-error';
        } else {
            $submissionSaveData = Arr::get($request->getParsedBody(), 'data', null);
            $currentUserID = $actor->id;
            $errorMessage = "";
            $submissionData = UserSubmission::find($submissionID);

            if (!isset($submissionData)) {
                $errorMessage = 'wusong8899-user-submission.forum.save-error';
            } else {
                if (Arr::has($submissionSaveData, "attributes.reviewResult")) {
                    $settingTimezone = (new CommonHelper)->getSettingTimezone();
                    $submissionData->review_result = Arr::get($submissionSaveData, "attributes.reviewResult", 0);
                    $submissionData->review_user_id = $currentUserID;
                    $submissionData->reviewed_at = Carbon::now($settingTimezone);
                    $submissionData->save();

                    $userData = User::find($submissionData->submission_user_id);

                    $this->notifications->sync(new UserSubmissionBlueprint($submissionData), [$userData]);
                    return $submissionData;
                }
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
