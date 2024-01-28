<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    return ['test' => true];
});


Route::get('/public/images/{filename}', function ($filename) {
    $path = public_path('images/' . $filename);
    return response()->file($path);
});

