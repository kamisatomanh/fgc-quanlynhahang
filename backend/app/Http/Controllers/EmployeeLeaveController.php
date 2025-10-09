<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Carbon\Carbon;

class EmployeeLeaveController extends Controller
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
        $leaves = $this->database->getReference('employee_leaves')->getValue();
        $users = $this->database->getReference('users')->getValue();

        foreach ($leaves as $key => &$leave) {
            $userId = $leave['user_id'];
            $leave['user_name'] = $users[$userId]['full_name'];
        }

        return response()->json(array_values($leaves));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Admin không cần thêm yêu cầu xin nghỉ
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $leave = $this->database->getReference("employee_leaves/{$id}")->getValue();

        if (!$leave) {
            return response()->json(['error' => 'Employee leave not found'], 404);
        }

        $userData = $this->database
            ->getReference("users/{$leave['user_id']}")
            ->getValue();

        $response = [
            'leave' => $leave,
            'user' => $userData
        ];

        return response()->json($response);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("employee_leaves/{$id}");
        if (!$ref->getValue()) {
            return response()->json(['error' => 'Employee leave not found'], 404);
        }

        $ref->update($request->all());
        $updatedLeave = $ref->getValue();
        return response()->json($updatedLeave);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("employee_leaves/{$id}");
        if (!$ref->getValue()) {
            return response()->json(['error' => 'Employee leave not found'], 404);
        }

        $ref->remove();
        return response()->json(['deleted' => true]);
    }
}
