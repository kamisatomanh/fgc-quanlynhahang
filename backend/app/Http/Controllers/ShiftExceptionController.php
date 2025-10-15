<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class ShiftExceptionController extends Controller
{

    protected $database;
    public function __construct() {
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
        $shiftsExData = $this->database->getReference('shifts_exeptions')->getValue();
        $shiftsEx = [];
        foreach ($shiftsExData as $key => $value) {
            $value['id'] = $key;
            $shiftsEx[] = $value;
        }
        return response()->json($shiftsEx);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newShiftEx = $this->database->getReference('shifts_exeptions')->push($data);
        $key = $newShiftEx->getKey();
        return response()->json(['key' => $key, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = $this->database->getReference("shifts_exeptions/{$id}")->getValue();
        if (!$data){
            return response()->json(['error' => 'Shifts exeptions not found'], 404);
        }

        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ref = $this->database->getReference("shifts_exeptions/{$id}");
        if (!$ref->getValue()){
            return response()->json(['error' => 'Shifts exeptions not found'], 404);
        }

        $ref->update($request->all());
        $updateShiftsEx = $ref->getValue();
        return response()->json($updateShiftsEx);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ref = $this->database->getReference("shifts_exeptions/{$id}");
        if (!$ref->getValue()){
            return response()->json(['error' => 'Shifts exeptions not found'], 404);
        }

        $ref->remove();
        return response()->json(['delete' => true]);
    }
}
