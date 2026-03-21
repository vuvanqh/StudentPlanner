// const terms = [
//   { term_id: "2025Z", start_date: "2025-10-01", end_date: "2026-02-28", is_active: 1 },
//   { term_id: "2025L", start_date: "2026-03-01", end_date: "2026-09-30", is_active: 0 },
// ];

// const courses = [
//   { course_id: "100", title: "Computer Graphics", faculty_id: "MINI" },
//   { course_id: "101", title: "Algorithms", faculty_id: "MINI" }
// ];

// const groups = [
//   { group_number: "1", course_id: "100", class_type: "Lecture", term_id: "2025Z" },
//   { group_number: "1", course_id: "101", class_type: "Laboratory", term_id: "2025L" }
// ];

// const students = [
//   { student_id: "1", first_name: "Jan", last_name: "Kowalski" },
//   { student_id: "2", first_name: "Anna", last_name: "Nowak" }
// ];

// const enrollments = [
//   {
//     student_id: "1",
//     course_id: "100",
//     group_number: "1",
//     class_type: "Lecture",
//     term_id: "2025Z"
//   },
//    {
//     student_id: "2",
//     course_id: "100",
//     group_number: "1",
//     class_type: "Lecture",
//     term_id: "2025Z"
//   },
//   {
//     student_id: "2",
//     course_id: "101",
//     group_number: "1",
//     class_type: "Laboratory",
//     term_id: "2025L"
//   }
// ];
const db = require('../db');

function getUserGroups(user_id) {
 const rows = db.prepare(`
    SELECT
      g.term_id,
      c.course_id,
      c.title AS course_name,
      g.group_number,
      g.class_type,
      c.faculty_id AS course_fac_id
    FROM enrollments e
    JOIN course_groups g
      ON g.course_id = e.course_id
     AND g.group_number = e.group_number
     AND g.class_type = e.class_type
     AND g.term_id = e.term_id
    JOIN courses c
      ON c.course_id = g.course_id
    WHERE e.student_id = ?
    ORDER BY g.term_id, c.course_id
  `).all(user_id);

  const grouped = {};

  for (const row of rows) {
    if (!grouped[row.term_id]) grouped[row.term_id] = [];

    grouped[row.term_id].push({
      course_id: row.course_id,
      course_name: row.course_name,
      group_number: row.group_number,
      class_type: row.class_type,
      course_fac_id: row.course_fac_id,
      term_id: row.term_id,
      relationship_type: 'participant'
    });
  }
  return grouped;
}

function getGroupById(course_id, group_number, class_type, term_id) {
   return db.prepare(`
    SELECT
      c.course_id AS course_unit_id,
      g.group_number,
      g.class_type,
      c.course_id,
      c.title,
      c.faculty_id,
      g.term_id
    FROM course_groups g
    JOIN courses c ON c.course_id = g.course_id
    WHERE g.course_id = ?
      AND g.group_number = ?
      AND g.class_type = ?
      AND g.term_id = ?
  `).get(course_id, group_number, class_type, term_id) || null;
}

function getGroupParticipants(course_id, group_number, class_type, term_id) {
   return db.prepare(`
    SELECT s.student_id, s.first_name, s.last_name
    FROM enrollments e
    JOIN students s ON s.student_id = e.student_id
    WHERE e.course_id = ?
      AND e.group_number = ?
      AND e.class_type = ?
      AND e.term_id = ?
    ORDER BY s.last_name, s.first_name
  `).all(course_id, group_number, class_type, term_id);
}

module.exports = { 
    getUserGroups, 
    getGroupById, 
    getGroupParticipants };