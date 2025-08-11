<?php

namespace wusong8899\userSubmission\Controllers;

use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Helpers\CommonHelper;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Carbon;

class UserSubmissionAddController extends AbstractCreateController
{
    public $serializer = UserSubmissionSerializer::class;
    protected $settings;
    protected $translator;

    public function __construct(Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $currentUserID = $request->getAttribute('actor')->id;
        $requestData = $request->getParsedBody()['data']['attributes'];
        $amount = floatval($requestData['amount']);
        $platform = $requestData['platform'];
        $platformAccount = $requestData['platformAccount'];
        $userAccount = $requestData['userAccount'];
        $errorMessage = "";

        if (!isset($amount) || $amount < 0) {
            $errorMessage = 'wusong8899-user-submission.forum.save-error';
        } else {
            $submissionCount = UserSubmission::where(["submission_user_id" => $currentUserID, "review_user_id" => null])->count();

            if ($submissionCount > 0) {
                $errorMessage = 'wusong8899-user-submission.forum.submission-in-review';
            } else {
                $settingTimezone = (new CommonHelper)->getSettingTimezone();

                $userSubmissionData = new UserSubmission();
                $userSubmissionData->amount = $amount;
                $userSubmissionData->platform = $platform;
                $userSubmissionData->submission_user_id = $currentUserID;
                $userSubmissionData->platform_account = $platformAccount;
                $userSubmissionData->user_account = $userAccount;
                $userSubmissionData->assigned_at = Carbon::now($settingTimezone);
                $userSubmissionData->save();

                return $userSubmissionData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
