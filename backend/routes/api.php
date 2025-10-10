<?php

use Illuminate\Support\Facades\Route;
use Kreait\Firebase\Factory;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\ShiftExceptionController;
use App\Http\Controllers\RuleController;
use App\Http\Controllers\EmployeeLeaveController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AttendanceController;

//NGƯỜI DÙNG
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);       
    Route::post('/', [UserController::class, 'store']);       
    Route::get('{id}', [UserController::class, 'show']);      
    Route::put('{id}', [UserController::class, 'update']);    
    Route::delete('{id}', [UserController::class, 'destroy']); 
});

//Ca làm việc
Route::prefix('shifts')->group(function(){
    Route::get('/', [ShiftController::class, 'index']);
    Route::post('/', [ShiftController::class, 'store']);
    Route::get('{id}', [ShiftController::class, 'show']);
    Route::put('{id}', [ShiftController::class, 'update']);    
    Route::delete('{id}', [ShiftController::class, 'destroy']); 
});

//Ca làm việc đặc biệt / ngoại lệ
Route::prefix('shifts_exeptions')->group(function(){
    Route::get('/', [ShiftExceptionController::class, 'index']);
    Route::post('/', [ShiftExceptionController::class, 'store']);
    Route::get('{id}', [ShiftExceptionController::class, 'show']);
    Route::put('{id}', [ShiftExceptionController::class, 'update']);
    Route::delete('{id}', [ShiftExceptionController::class, 'destroy']);
});

//Luật thưởng / phạt
Route::prefix('rules')->group(function () {
    Route::get('/', [RuleController::class, 'index']);
    Route::post('/', [RuleController::class, 'store']);
    Route::get('{id}', [RuleController::class, 'show']);
    Route::put('{id}', [RuleController::class, 'update']);
    Route::delete('{id}', [RuleController::class, 'destroy']);
});

//Yêu cầu xin nghỉ
Route::prefix('employee-leaves')->group(function () {
    Route::get('/', [EmployeeLeaveController::class, 'index']);      
    Route::get('{id}', [EmployeeLeaveController::class, 'show']);     
    Route::put('{id}', [EmployeeLeaveController::class, 'update']);   
    Route::delete('{id}', [EmployeeLeaveController::class, 'destroy']);
});

//Thông báo
Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);        
    Route::post('/', [NotificationController::class, 'store']);       
    Route::get('{id}', [NotificationController::class, 'show']);      
    Route::put('{id}', [NotificationController::class, 'update']);    
    Route::delete('{id}', [NotificationController::class, 'destroy']);
});

//Điểm danh
Route::prefix('attendances')->group(function () {
    Route::get('/', [AttendanceController::class, 'index']);           
    Route::get('{id}', [AttendanceController::class, 'show']);      
    Route::put('{id}', [AttendanceController::class, 'update']);    
    Route::delete('{id}', [AttendanceController::class, 'destroy']); 
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
