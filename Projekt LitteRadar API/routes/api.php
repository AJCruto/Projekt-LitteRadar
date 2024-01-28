<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GarbageBinController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return [
        'user' => $request->user(),
    ];
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::prefix('users')->group(function () {
    Route::get('/get', [UserController::class, 'index']);
});


Route::prefix('garbage-bin')->group(function () {
    Route::get('/get', [GarbageBinController::class, 'index']);
    Route::any('/{name}/{longitude}/{latitude}', [GarbageBinController::class, 'updateOrCreate']);
});


