<?php

namespace wusong8899\userSubmission\Controllers;

use Flarum\User\User;
use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\UrlGenerator;

use wusong8899\userSubmission\Serializer\UserSubmissionSerializer;
use wusong8899\userSubmission\Model\UserSubmission;

class ListUserApplicationController extends AbstractListController
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
        $params = $request->getQueryParams();
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $currentUserID = $request->getAttribute('actor')->id;

        $userApplicationResult = UserSubmission::where("submission_user_id", $currentUserID)->skip($offset)->take($limit + 1)->orderBy('id', 'desc')->get();
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
