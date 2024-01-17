// ESM
import { faker } from "@faker-js/faker";

// Function to generate random lesson data
function createRandomLesson() {
  return {
    id: faker.string.uuid(),
    lname: faker.internet.userName(),
    content: faker.lorem.paragraph(),
  };
}

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random chapter data with lessons
function createRandomChapter() {
  const numberOfLessons = getRandomNumber(4, 6);
  const lessons = Array.from({ length: numberOfLessons }, createRandomLesson);

  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    summarize: faker.lorem.sentence(),
    lessons,
    lname: faker.internet.userName(),
    content: faker.lorem.paragraph(),
  };
}

// Function to generate random course data with chapters
function createRandomCourse() {
  const numberOfChapters = getRandomNumber(2, 4);
  const chapters = Array.from(
    { length: numberOfChapters },
    createRandomChapter
  );

  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    summarize: faker.lorem.sentence(),
    category_id: faker.string.uuid(),
    chapters,
  };
}

// Generating an array of random course data
const coursesData = Array.from({ length: 5 }, createRandomCourse);

export default coursesData;
