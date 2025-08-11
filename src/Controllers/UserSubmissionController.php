<?php

namespace wusong8899\userSubmission\Controllers;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class UserSubmissionController
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        return $document;
    }
}
