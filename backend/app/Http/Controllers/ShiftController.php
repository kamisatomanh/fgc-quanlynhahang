<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class ShiftController extends Controller
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
        $shiftData = $this->database->getReference('shifts')->getValue();
        $shift = [];
        foreach ($shiftData as $key => $value) {
            $value['id'] = $key;
            $shift[] = $value;
        }
        return response()->json($shift);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newShiftRef = $this->database->getReference('shifts')->push($data);
        $key = $newShiftRef->getKey();
        return response()->json(['key' => $key, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shift = $this->database->getReference("shifts/{$id}")->getValue();
        if (!$shift) {
             return response()->json(['error' => 'Shift not found'], 404);
        }
        return response()->json($shift);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("shifts/{$id}");
        if (!$ref->getValue()){
            return response()->json(['error', 'Shift not found']);
        }
        $ref->update($request->all());
        $updatedShift = $ref->getValue();
        return response()->json($updatedShift);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("shifts/{$id}");
        if (!$ref->getValue()){
            return response()->json(['error', 'Shift not found']);
        }
        
        $ref->remove();
        return response()->json(['deleted' => true]);
    }
}
