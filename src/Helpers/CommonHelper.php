<?php

declare(strict_types=1);

namespace wusong8899\userSubmission\Helpers;

use wusong8899\userSubmission\Constants\UserSubmissionConstants;
use wusong8899\userSubmission\Services\TimezoneService;

/**
 * Common helper class for backward compatibility
 * @deprecated Use specific service classes instead
 */
class CommonHelper
{
    public function __construct(
        private readonly ?TimezoneService $timezoneService = null
    ) {
    }

    /**
     * Get setting timezone
     * @deprecated Use TimezoneService::getTimezone() instead
     */
    public function getSettingTimezone(): string
    {
        return $this->timezoneService?->getTimezone() ?? UserSubmissionConstants::DEFAULT_TIMEZONE;
    }
}
