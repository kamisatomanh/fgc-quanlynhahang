<?php

use Illuminate\Support\Facades\Route;
use Kreait\Firebase\Factory;
use App\Http\Controllers\UserController;



Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);       
    Route::post('/', [UserController::class, 'store']);       
    Route::get('{id}', [UserController::class, 'show']);      
    Route::put('{id}', [UserController::class, 'update']);    
    Route::delete('{id}', [UserController::class, 'destroy']); 
});

Route::get('/test-firebase', function () {
    $factory = (new Factory)
        ->withServiceAccount(base_path(env('FIREBASE_CREDENTIALS')))
        ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

    $database = $factory->createDatabase();

    $newUser = $database
        ->getReference('users')
        ->push([
            'full_name' => 'Lê Phan Bình D',
            'phone_number' => '0123456789',
            'password_hash' => '123456',
            'bank_name' => 'LE PHAN BINH DUONG',
            'bank_number' => '9876543210',
            'role' => 'admin',
            'status' => true,
            'created_at' => now()->toDateTimeString()
        ]);

    return $newUser->getValue();
});
