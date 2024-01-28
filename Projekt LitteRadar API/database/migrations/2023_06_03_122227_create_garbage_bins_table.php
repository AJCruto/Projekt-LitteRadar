<?php

use App\Models\GarbageBin;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGarbageBinsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garbage_bins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('longitude', 10, 7);
            $table->decimal('latitude', 10, 7);
            $table->decimal('prev_lon', 10, 7);
            $table->decimal('prev_lat', 10, 7);
            $table->boolean("is_moving");
            $table->decimal('distance', 10, 2)->nullable();
            $table->timestamp('moved_at')->nullable();
            $table->timestamps();
        });

        // create data

        $garbageBins = [
            [
                'name' => 'bin-1',
                'longitude' => 120.8779820,
                'latitude' => 14.1961010,
                'prev_lon' => 0,
                'prev_lat' => 0,
                'distance' => 0,
                'is_moving' => true,
            ],
            [
                'name' => 'bin-2',
                'longitude' => 120.8780820,
                'latitude' => 14.1957390,
                'prev_lon' => 120.8780820,
                'prev_lat' => 14.1957390,
                'distance' => 5,
                'is_moving' => false,
            ],
            [
                'name' => 'bin-3',
                'longitude' => 120.8780880,
                'latitude' => 14.1957440,
                'prev_lon' => 120.8780880,
                'prev_lat' => 14.1957440,
                'distance' => 5,
                'is_moving' => false,
            ],
        ];

        GarbageBin::insert($garbageBins);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('garbage_bins');
    }
}
