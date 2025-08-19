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
 * Controller for listing user submissions (admin view)
 */
class ListUserSubmissionController extends AbstractListController
{
    public $serializer = UserSubmissionSerializer::class;
    public $include = ['fromUser', 'reviewUser'];


    public function __construct(
        private readonly UrlGenerator $url
    ) {
    }

    /**
     * Get paginated list of user submissions
     */
    protected function data(ServerRequestInterface $request, Document $document): Collection
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $params = $request->getQueryParams();
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        // Get all submissions, ordered by newest first
        $userSubmissionResult = UserSubmission::with(['fromUser', 'reviewUser'])
            ->skip($offset)
            ->take($limit + 1)
            ->orderBy('id', 'desc')
            ->get();

        $hasMoreResults = $limit > 0 && $userSubmissionResult->count() > $limit;

        if ($hasMoreResults) {
            $userSubmissionResult->pop();
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('userSubmission.get'),
            $params,
            $offset,
            $limit,
            $hasMoreResults ? null : 0,
        );

        return $userSubmissionResult;
    }
}
