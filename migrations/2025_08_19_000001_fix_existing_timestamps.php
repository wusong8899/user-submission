<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\Carbon;

return [
    'up' => function (Builder $schema) {
        // Add timestamps columns if they don't exist
        if ($schema->hasTable('wusong8899_user_submission')) {
            $schema->table('wusong8899_user_submission', function (Blueprint $table) {
                // Check if columns exist before adding
                if (!$schema->hasColumn('wusong8899_user_submission', 'created_at')) {
                    $table->timestamps();
                }
            });
            
            // Update existing records with null timestamps
            $now = Carbon::now();
            $connection = $schema->getConnection();
            
            // Update records where created_at or updated_at is null
            $connection->table('wusong8899_user_submission')
                ->whereNull('created_at')
                ->orWhereNull('updated_at')
                ->update([
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
        }
    },
    'down' => function (Builder $schema) {
        // This migration only fixes data, no rollback needed
    },
];