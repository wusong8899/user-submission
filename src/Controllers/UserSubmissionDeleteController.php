<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Controllers;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use wusong8899\userSubmission\Model\UserSubmission;
use wusong8899\userSubmission\Services\UserSubmissionService;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\Exception\PermissionDeniedException;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Arr;

/**
 * Controller for deleting user submissions
 */
class UserSubmissionDeleteController extends AbstractDeleteController
{
    public function __construct(
        private readonly UserSubmissionService $submissionService,
        private readonly Translator $translator
    ) {
    }

    /**
     * Delete a user submission
     *
     * @throws ValidationException
     * @throws PermissionDeniedException
     */
    protected function delete(ServerRequestInterface $request): void
    {
        $actor = $request->getAttribute('actor');
        $submissionId = (int) Arr::get($request->getQueryParams(), 'id');

        // If not in query params, try route parameters
        if ($submissionId <= 0) {
            $submissionId = (int) ($request->getAttribute('routeParams')['id'] ?? 0);
        }

        if ($submissionId <= 0) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_SAVE_FAILED)
            ]);
        }

        $submission = UserSubmission::find($submissionId);

        if ($submission === null) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_NOT_FOUND)
            ]);
        }

        // Check authorization
        if (!$this->submissionService->canDeleteSubmission($actor, $submission)) {
            throw new PermissionDeniedException(
                $this->translator->trans(UserSubmissionConstants::ERROR_UNAUTHORIZED)
            );
        }

        // Attempt to delete
        if (!$this->submissionService->deleteSubmission($submission)) {
            throw new ValidationException([
                'message' => $this->translator->trans(UserSubmissionConstants::ERROR_DELETE_FAILED)
            ]);
        }
    }
}
