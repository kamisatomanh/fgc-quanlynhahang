<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    protected $database;

    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(base_path(env('FIREBASE_CREDENTIALS')))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->database = $factory->createDatabase();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attendances = $this->database->getReference('attendances')->getValue();
        $users = $this->database->getReference('users')->getValue();
        $shifts = $this->database->getReference('shifts')->getValue();
        $leaves = $this->database->getReference('employee_leaves')->getValue() ?? [];

        foreach ($attendances as $key => &$attendance) {
            $attendance['id'] = $key;
            $attendance['user_name'] = $users[$attendance['user_id']]['full_name'] ?? 'Không xác định';
            $attendance['shift_name'] = $shifts[$attendance['shift_id']]['name'] ?? 'Không xác định';
            $attendance['leave_title'] = isset($attendance['leave_id']) ? ($leaves[$attendance['leave_id']]['title'] ?? 'Không xác định') : null;
        }

        return response()->json($attendances);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Admin không cần thêm mới điểm danh
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $attendance = $this->database->getReference("attendances/{$id}")->getValue();

        $user = $this->database->getReference("users/{$attendance['user_id']}")->getValue();
        $shift = $this->database->getReference("shifts/{$attendance['shift_id']}")->getValue();

        $leave = isset($attendance['leave_id']) && $attendance['leave_id']
                ? $this->database->getReference("employee_leaves/{$attendance['leave_id']}")->getValue() 
                : null;

        $attendance['user'] = $user;
        $attendance['shift'] = $shift;
        $attendance['leave'] = $leave;

        return response()->json($attendance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("attendances/{$id}");

        if (!$ref->getValue()) {
            return response()->json(['error' => 'Attendance not found'], 404);
        }

        $data = [
            'check_in' => $request->input('check_in', $ref->getChild('check_in')->getValue()),
            'check_out' => $request->input('check_out', $ref->getChild('check_out')->getValue()),
            'shift_id' => $request->input('shift_id', $ref->getChild('shift_id')->getValue()),
            'leave_id' => $request->has('leave_id') ? $request->input('leave_id') : null,
        ];

        $ref->update($data);

        $updatedAttendance = $ref->getValue();
        $user = $this->database->getReference("users/{$updatedAttendance['user_id']}")->getValue();
        $shift = $this->database->getReference("shifts/{$updatedAttendance['shift_id']}")->getValue();
        $leave = $updatedAttendance['leave_id'] 
                ? $this->database->getReference("employee_leaves/{$updatedAttendance['leave_id']}")->getValue() 
                : null;

        $updatedAttendance['user'] = $user;
        $updatedAttendance['shift'] = $shift;
        $updatedAttendance['leave'] = $leave;

        return response()->json($updatedAttendance);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("attendances/{$id}");

        if (!$ref->getValue()) {
            return response()->json(['error' => 'Attendance not found'], 404);
        }

        $ref->remove();
        return response()->json(['deleted' => true]);
    }
}
