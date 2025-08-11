<?php

namespace wusong8899\userSubmission\Controllers;

use Flarum\User\User;
use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\UrlGenerator;
use Illuminate\Support\Carbon;

use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;

class ListUserSubmissionController extends AbstractListController
{
    public $serializer = UserSubmissionSerializer::class;
    public $include = ['fromUser', 'reviewUser'];
    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();
        $params = $request->getQueryParams();
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $userSubmissionResult = UserSubmission::where('assigned_at', '>=', Carbon::now()->subDays(3)->toDateTimeString())->skip($offset)->take($limit + 1)->orderBy('id', 'desc')->get();
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
