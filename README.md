# Student Management API

A simple Node.js / Express / MongoDB REST API for managing student data, including advanced query endpoints.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start MongoDB locally or set `MONGODB_URI` in your environment.

3. Run the app:

```bash
npm run dev
```

## Default endpoints

- `POST /students` - add a new student
- `GET /students` - view all students
- `GET /students/email/:email` - find student by email
- `PATCH /students/:id/gpa` - update student GPA
- `DELETE /students/:id` - delete student
- `GET /students/gpa-range` - students with GPA between 3.0 and 3.5
- `GET /students/more-than/:count/courses` - students enrolled in more than `count` courses
- `GET /students/top` - top 10 students by GPA
- `GET /students/count-by-city` - count students grouped by city

## Example student JSON

```json
{
  "name": "Aisha Khan",
  "email": "aisha.khan@example.com",
  "gpa": 3.7,
  "city": "Lahore",
  "courses": ["CS101", "MATH202", "ENG103"]
}
```
