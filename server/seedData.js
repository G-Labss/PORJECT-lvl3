require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Lesson = require('./models/Lesson');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        await User.deleteMany({});
        await Lesson.deleteMany({});
        console.log('🗑️  Cleared existing data');

        const coach = await User.create({
            name: 'Daniil Medvedev',
            email: 'daniil@tenniscoach.com',
            bio: 'Professional tennis coach with 10 years of experience. Specializing in advanced techniques and match strategy.',
            ntrpRating: 5.5,
            yearsExperience: 10,
            specialties: ['Serve technique', 'Match strategy', 'Mental game'],
        });

        console.log('✅ Created coach:', coach.name);

        const lessons = await Lesson.insertMany([
            {
                title: 'Beginner Tennis Fundamentals',
                description: 'Learn the basics of tennis including proper grip, stance, footwork, and fundamental strokes. Perfect for those new to the game!',
                duration: 60,
                price: 75,
                level: 'Beginner',
                maxStudents: 4,
                coach: coach._id,
            },
            {
                title: 'Advanced Serve Technique',
                description: 'Master professional serving techniques including power, spin, and placement. Transform your serve into a weapon!',
                duration: 90,
                price: 120,
                level: 'Advanced',
                maxStudents: 2,
                coach: coach._id,
            },
            {
                title: 'Intermediate Match Strategy',
                description: 'Develop tactical awareness and strategic thinking for competitive matches. Learn to read your opponent and adjust your game.',
                duration: 75,
                price: 95,
                level: 'Intermediate',
                maxStudents: 3,
                coach: coach._id,
            },
        ]);

        console.log(`✅ Created ${lessons.length} lessons`);
        console.log('🎉 Database seeded successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();