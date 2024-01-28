<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('description');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('photo');
            $table->rememberToken();
            $table->timestamps();
        });

        User::insert([
            [
                'name' => 'Andrea Joy F. Cruto',
                'email' => 'testemail1@gmail.com',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'description' => 'Computer Science Student 1',
                'photo' => 'avatar1.webp'
            ],
            [
                'name' => 'Dianne M. Ermino',
                'email' => 'testemail2@gmail.com',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'description' => 'Computer Science Student 2',
                'photo' => 'avatar2.webp'
            ],
            [
                'name' => 'John Paul Ramos',
                'email' => 'testemail3@gmail.com',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'description' => 'Computer Science Student 3',
                'photo' => 'avatar3.webp'
            ],
            [
                'name' => 'Karl Ingrame S. Rivas',
                'email' => 'testemail4@gmail.com',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'description' => 'Computer Science Student 4',
                'photo' => 'avatar4.webp'
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@litteradar.com',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'description' => 'admin account',
                'photo' => 'avatar.webp'
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
