<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Controllers;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Services\UserSubmissionService;
use wusong8899\userSubmission\Notification\UserSubmissionBlueprint;
use Flarum\User\User;
use Flarum\Notification\NotificationSyncer;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

/**
 * Controller for updating user submissions (review process)
 */
class UserSubmissionUpdateController extends AbstractCreateController
{
    public $serializer = UserSubmissionSerializer::class;

    public function __construct(
        private readonly UserSubmissionService $submissionService,
        private readonly Translator $translator,
        private readonly NotificationSyncer $notifications
    ) {
    }

    /**
     * Update a user submission (review it)
     *
     * @throws ValidationException
     */
    protected function data(ServerRequestInterface $request, Document $document): UserSubmission
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $submissionId = (int) Arr::get($request->getQueryParams(), 'id');

        if ($submissionId <= 0) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_SAVE_FAILED)
            ]);
        }

        $submissionData = UserSubmission::find($submissionId);

        if ($submissionData === null) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_NOT_FOUND)
            ]);
        }

        $submissionSaveData = Arr::get($request->getParsedBody(), 'data', []);

        if (!Arr::has($submissionSaveData, 'attributes.reviewResult')) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_SAVE_FAILED)
            ]);
        }

        $reviewResult = (int) Arr::get($submissionSaveData, 'attributes.reviewResult', 0);
        $currentUserId = (int) $actor->id;

        // Review the submission
        $reviewedSubmission = $this->submissionService->reviewSubmission(
            submission: $submissionData,
            reviewerId: $currentUserId,
            reviewResult: $reviewResult
        );

        // Send notification to the user
        $userData = User::find($submissionData->submission_user_id);
        if ($userData !== null) {
            $this->notifications->sync(
                new UserSubmissionBlueprint($reviewedSubmission),
                [$userData]
            );
        }

        return $reviewedSubmission;
    }
}
