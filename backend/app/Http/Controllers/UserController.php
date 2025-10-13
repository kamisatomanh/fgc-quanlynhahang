<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $database;

    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(base_path(env('FIREBASE_CREDENTIALS')))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->database = $factory->createDatabase();
    }

    public function index()
    {
        $usersData = array_values($this->database->getReference('users')->getValue());
        $users = [];
        foreach ($usersData as $key => $value) {
            $value['id'] = $key;
            $users[] = $value;
        }
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['created_at'] = Carbon::now()->toDateTimeString();

        $newUserRef = $this->database->getReference('users')->push($data);
        $key = $newUserRef->getKey();
        return response()->json(['key' => $key, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->database->getReference("users/{$id}")->getValue();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("users/{$id}");
        if (!$ref->getValue()) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $ref->update($request->all());
        $updatedUser = $ref->getValue();

        return response()->json($updatedUser);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("users/{$id}");
        if (!$ref->getValue()) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $ref->remove();
        return response()->json(['deleted' => true]);
    }
}
