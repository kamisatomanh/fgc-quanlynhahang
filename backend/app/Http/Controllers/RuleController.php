<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Carbon\Carbon;

class RuleController extends Controller
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
        $rulesData = array_values($this->database->getReference('rules')->getValue());
        $rules = [];
        foreach ($rulesData as $key => $value) {
            $value['id'] = $key;
            $rules[] = $value;
        }
        return response()->json($rules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['created_at'] = Carbon::now()->toDateTimeString();

        $newRule = $this->database->getReference('rules')->push($data);
        $key = $newRule->getKey();

        return response()->json(['key' => $key, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rule = $this->database->getReference("rules/{$id}")->getValue();

        if (!$rule) {
            return response()->json(['error' => 'Rule not found'], 404);
        }

        return response()->json($rule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("rules/{$id}");

        if (!$ref->getValue()) {
            return response()->json(['error' => 'Rule not found'], 404);
        }

        $ref->update($request->all());
        $updatedRule = $ref->getValue();

        return response()->json($updatedRule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("rules/{$id}");

        if (!$ref->getValue()) {
            return response()->json(['error' => 'Rule not found'], 404);
        }

        $ref->remove();
        return response()->json(['deleted' => true]);
    }
}
