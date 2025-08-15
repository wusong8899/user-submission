<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Services;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use Flarum\Settings\SettingsRepositoryInterface;

/**
 * Service class for timezone management
 */
class TimezoneService
{
    public function __construct(
        private readonly SettingsRepositoryInterface $settings
    ) {
    }

    /**
     * Get the configured timezone or default
     */
    public function getTimezone(): string
    {
        return $this->settings->get(
            'user-submission.timezone',
            UserSubmissionConstants::DEFAULT_TIMEZONE
        );
    }

    /**
     * Set the timezone setting
     */
    public function setTimezone(string $timezone): void
    {
        $this->settings->set('user-submission.timezone', $timezone);
    }
}
