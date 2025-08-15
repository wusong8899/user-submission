<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\UrlGenerator;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;
use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;

/**
 * Controller for listing user's own submissions (user view)
 */
class ListUserApplicationController extends AbstractListController
{
    public $serializer = UserSubmissionSerializer::class;
    public $include = ['fromUser', 'reviewUser'];

    private const DEFAULT_DAYS_FILTER = 3;

    public function __construct(
        private readonly UrlGenerator $url
    ) {
    }

    /**
     * Get paginated list of current user's submissions
     */
    protected function data(ServerRequestInterface $request, Document $document): Collection
    {
        $actor = $request->getAttribute('actor');
        $params = $request->getQueryParams();
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $currentUserId = (int) $actor->id;

        $userApplicationResult = UserSubmission::where('submission_user_id', $currentUserId)
            ->where(
                'assigned_at',
                '>=',
                Carbon::now()->subDays(self::DEFAULT_DAYS_FILTER)->toDateTimeString()
            )
            ->skip($offset)
            ->take($limit + 1)
            ->orderBy('id', 'desc')
            ->get();

        $hasMoreResults = $limit > 0 && $userApplicationResult->count() > $limit;

        if ($hasMoreResults) {
            $userApplicationResult->pop();
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('userSubmissionApplication.get'),
            $params,
            $offset,
            $limit,
            $hasMoreResults ? null : 0,
        );

        return $userApplicationResult;
    }
}
