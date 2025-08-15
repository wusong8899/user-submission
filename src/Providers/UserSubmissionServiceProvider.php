<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Providers;

use wusong8899\userSubmission\Services\UserSubmissionService;
use wusong8899\userSubmission\Services\TimezoneService;
use Flarum\Foundation\AbstractServiceProvider;

/**
 * Service provider for User Submission extension
 */
class UserSubmissionServiceProvider extends AbstractServiceProvider
{
    /**
     * Register services in the container
     */
    public function register(): void
    {
        $this->container->singleton(TimezoneService::class, function ($container) {
            return new TimezoneService(
                $container->make('flarum.settings')
            );
        });

        $this->container->singleton(UserSubmissionService::class, function ($container) {
            return new UserSubmissionService(
                $container->make(TimezoneService::class)
            );
        });
    }
}
