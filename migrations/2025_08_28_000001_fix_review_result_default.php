<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // Fix existing data: set review_result to NULL for pending submissions
        // that were incorrectly set to 0 due to the previous default value
        $schema->getConnection()
            ->table('wusong8899_user_submission')
            ->where('review_result', 0)
            ->whereNull('reviewed_at')
            ->whereNull('review_user_id')
            ->update(['review_result' => null]);
    },
    'down' => function (Builder $schema) {
        // Rollback: set review_result back to 0 for pending submissions
        $schema->getConnection()
            ->table('wusong8899_user_submission')
            ->whereNull('review_result')
            ->whereNull('reviewed_at')
            ->whereNull('review_user_id')
            ->update(['review_result' => 0]);
    },
];