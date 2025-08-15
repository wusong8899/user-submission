<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Controllers;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Services\UserSubmissionService;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

/**
 * Controller for creating user submissions
 */
class UserSubmissionAddController extends AbstractCreateController
{
    public $serializer = UserSubmissionSerializer::class;

    public function __construct(
        private readonly UserSubmissionService $submissionService,
        private readonly Translator $translator
    ) {
    }

    /**
     * Create a new user submission
     *
     * @throws ValidationException
     */
    protected function data(ServerRequestInterface $request, Document $document): UserSubmission
    {
        $actor = $request->getAttribute('actor');
        $currentUserId = (int) $actor->id;
        $requestData = $request->getParsedBody()['data']['attributes'] ?? [];

        // Extract and validate data
        $amount = (float) ($requestData['amount'] ?? 0);
        $platform = (string) ($requestData['platform'] ?? '');
        $platformAccount = (string) ($requestData['platformAccount'] ?? '');
        $userAccount = (string) ($requestData['userAccount'] ?? '');

        // Validate submission data
        $validationErrors = $this->submissionService->validateSubmissionData([
            'amount' => $amount,
            'platform' => $platform,
            'platformAccount' => $platformAccount,
            'userAccount' => $userAccount,
        ]);

        if (!empty($validationErrors)) {
            throw new ValidationException([
                'message' => $this->translator->trans($validationErrors[0])
            ]);
        }

        // Check for pending submissions
        if ($this->submissionService->hasPendingSubmissions($currentUserId)) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_SUBMISSION_IN_REVIEW)
            ]);
        }

        // Create the submission
        return $this->submissionService->createSubmission(
            userId: $currentUserId,
            amount: $amount,
            platform: $platform,
            platformAccount: $platformAccount,
            userAccount: $userAccount
        );
    }
}
