<?php

namespace App\Http\Controllers;

use App\Models\GarbageBin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class GarbageBinController extends Controller
{
    // Retrieve all garbage bins and return as JSON
    public function index()
    {
        $garbageBins = GarbageBin::all();

        return response()->json($garbageBins);
    }

    private function haversine($lat1, $lon1, $lat2, $lon2)
    {
        // Radius of the Earth in meters
        $R = 6371000;

        // Convert latitude and longitude from degrees to radians
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        // Haversine formula
        $dlon = $lon2 - $lon1;
        $dlat = $lat2 - $lat1;
        $a = sin($dlat / 2) ** 2 + cos($lat1) * cos($lat2) * sin($dlon / 2) ** 2;
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $R * $c;

        return $distance;
    }

    // Update or create a garbage bin based on provided data
    public function updateOrCreate(Request $request, $name, $longitude, $latitude)
    {
        // Prepare the data to be validated and saved
        $data = [
            'name' => $name,
            'longitude' => $longitude,
            'latitude' => $latitude,
        ];

        // Define validation rules for the data
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
        ]);

        // Check if validation fails and return errors if so
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get validated data
        $validatedData = $validator->getData();
        $validatedName = $validatedData['name'];
        $validatedLatitude = $validatedData['latitude'];
        $validatedLongitude = $validatedData['longitude'];

        $selectedBin = GarbageBin::where('name', $validatedName)->first();

        if ($selectedBin) {
            $newLat = $validatedLatitude;
            $newLon = $validatedLongitude;
            $prevLat = $selectedBin->latitude;
            $prevLon = $selectedBin->longitude;
            $distance = $this->haversine($prevLat, $prevLon, $newLat, $newLon);
            $isMoving = ($distance >= 10) ? true : false;

            $garbageBin = GarbageBin::updateOrCreate(
                ['name' => $validatedName],
                [
                    'longitude' => $newLon,
                    'latitude' => $newLat,
                    'prev_lon' => $prevLon,
                    'prev_lat' => $prevLat,
                    'is_moving' => $isMoving,
                    'distance' => $distance,
                    'moved_at' => Carbon::now()->toDateTimeString()
                ]
            );
        } else {
            // Update or create a garbage bin record based on the provided name
            $garbageBin = GarbageBin::updateOrCreate(
                ['name' => $validatedName],
                [
                    'longitude' => $validatedLongitude,
                    'latitude' => $validatedLatitude,
                    'prev_lon' => $validatedLongitude,
                    'prev_lat' => $validatedLatitude,
                    'is_moving' => false,
                    'distance' => 0,
                    'moved_at' => Carbon::now()->toDateTimeString()
                ]
            );
        }

        // Return the updated or created garbage bin as JSON response
        return response()->json($garbageBin);
    }
}
