<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('wusong8899_user_submission')) {
            $schema->create('wusong8899_user_submission', function (Blueprint $table) {
                $table->increments('id');
                $table->float('amount')->unsigned()->default(0);
                $table->string('platform', 500);
                $table->string('platform_account', 500);
                $table->string('user_account', 500);
                $table->integer('submission_user_id')->unsigned();
                $table->integer('review_user_id')->unsigned()->nullable();
                $table->integer('review_result')->nullable();
                $table->dateTime('assigned_at')->nullable();
                $table->dateTime('reviewed_at')->nullable();
                $table->timestamps();

                $table->foreign('submission_user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('review_user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->drop('wusong8899_user_submission');
    },
];
