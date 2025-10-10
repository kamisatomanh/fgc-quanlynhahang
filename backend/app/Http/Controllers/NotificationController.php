<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class NotificationController extends Controller
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
        $notifications = $this->database->getReference('notifications')->getValue();
        $users = $this->database->getReference('users')->getValue();

        foreach ($notifications as $key => &$noti) {
            if (!empty($noti['user_id'])) {
                $noti['user_name'] = $users[$noti['user_id']]['full_name'];
            } else {
                $noti['user_name'] = 'Tất cả người dùng';
            }
        }

        return response()->json($notifications);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notification = $this->database->getReference("notifications/{$id}")->getValue();
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        if (!empty($notification['user_id'])) {
            $user = $this->database->getReference("users/{$notification['user_id']}")->getValue();
            $notification['user'] = $user ?? ['full_name' => 'Không xác định'];
        } else {
            $notification['user'] = ['full_name' => 'Tất cả người dùng'];
        }

        $users = $this->database->getReference('users')->getValue() ?? [];
        $userList = [];
        foreach ($users as $key => $u) {
            $userList[] = [
                'id' => $key,
                'full_name' => $u['full_name'] ?? 'Không rõ tên',
            ];
        }

        return response()->json([
            'notification' => $notification,
            'all_users' => $userList
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        if (!isset($data['user_id']) || $data['user_id'] === '') {
            $data['user_id'] = null;
        }

        $data['created_at'] = now()->toDateTimeString();

        $newNotificationRef = $this->database->getReference('notifications')->push($data);
        $key = $newNotificationRef->getKey();

        return response()->json([
            'key' => $key,
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("notifications/{$id}");
        if (!$ref->getValue()) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        $data = $request->all();
        if (!isset($data['user_id'])) {
            $data['user_id'] = null;
        }
        $ref->update($data);
        
        $updatedNotification = $ref->getValue();
        return response()->json($updatedNotification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("notifications/{$id}");
        if (!$ref->getValue()) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        $ref->remove();
        return response()->json(['deleted' => true]);
    }
}
