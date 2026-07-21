/**
 * UNIVERSITY SYSTEM - JavaScript Implementation
 * =============================================
 * 
 * DATA STRUCTURE RECOMMENDATION:
 * - Student: Object with { name, faculty, grades[] }
 * - University: Object with Map<id, Student> for O(1) lookups
 * - Grades: Array for efficient iteration and aggregation
 * 
 * ROLES & GOALS:
 * - Student Role: Manage personal academic records (grades, faculty)
 * - University Role: Manage student population and institutional analytics
 * - Goal: Efficient storage, retrieval, and calculation of academic metrics
 */

// ============================================
// STUDENT CLASS
// ============================================

/**
 * Student represents an individual student in the university system
 * @class Student
 * @param {string} name - Student's full name
 * @param {string} faculty - Student's faculty/department
 * 
 * @property {string} name - Student's name
 * @property {string} faculty - Student's faculty
 * @property {number[]} grades - Array of student's grades
 */
class Student {
  constructor(name, faculty) {
    this.name = name;
    this.faculty = faculty;
    this.grades = [];
  }

  /**
   * Adds a grade to the student's record
   * EFFICIENCY NOTE: O(1) operation - direct array push
   * 
   * @param {number} grade - Grade to add (must be non-negative)
   * @returns {boolean} - True if grade was added successfully
   * @throws {Error} - If grade is negative
   * 
   * @example
   * student.addGrade(85);
   * student.addGrade(-5); // throws Error
   */
  addGrade(grade) {
    if (grade < 0) {
      throw new Error(`Grade cannot be negative. Received: ${grade}`);
    }
    this.grades.push(grade);
    return true;
  }

  /**
   * Calculates the average of all student's grades
   * 
   * EFFICIENCY ANALYSIS:
   * - Time Complexity: O(n) where n = number of grades
   * - Space Complexity: O(1) - single accumulator variable
   * - This is OPTIMAL because we must traverse all grades once
   * - No redundant calculations or nested loops
   * 
   * CHAIN-OF-THOUGHT Implementation:
   * Step 1: Check if grades array is empty
   * Step 2: If empty, return 0 (no grades = no average)
   * Step 3: Sum all grades using reduce (single pass)
   * Step 4: Divide sum by total number of grades
   * Step 5: Return result rounded to 2 decimal places
   * 
   * @returns {number} - Average grade (0 if no grades), rounded to 2 decimals
   * 
   * @example
   * student.addGrade(80);
   * student.addGrade(90);
   * student.addGrade(70);
   * console.log(student.getGradesAverage()); // 80
   */
  getGradesAverage() {
    if (this.grades.length === 0) return 0;
    
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return Math.round((sum / this.grades.length) * 100) / 100;
  }

  /**
   * Changes the student's faculty/department
   * EFFICIENCY NOTE: O(1) operation - direct property assignment
   * 
   * @param {string} newFaculty - New faculty name
   * @returns {string} - Confirmation message with old and new faculty
   * 
   * @example
   * student.changeFaculty("Engineering");
   * // Returns: "Faculty changed from Science to Engineering"
   */
  changeFaculty(newFaculty) {
    const oldFaculty = this.faculty;
    this.faculty = newFaculty;
    return `Faculty changed from ${oldFaculty} to ${newFaculty}`;
  }

  /**
   * Returns a string representation of the student
   * 
   * @returns {string} - Formatted student info
   */
  toString() {
    return `${this.name} (${this.faculty}) - Avg: ${this.getGradesAverage()}`;
  }
}

// ============================================
// UNIVERSITY CLASS
// ============================================

/**
 * University manages a collection of students and institutional analytics
 * @class University
 * 
 * @property {Map<number, Student>} students - Map of student ID to Student object
 * @property {number} nextId - Counter for generating unique student IDs
 * 
 * DATA STRUCTURE RATIONALE:
 * - Using Map instead of Array for O(1) student lookups by ID
 * - Map maintains insertion order (predictable iteration)
 * - Provides efficient add/remove operations
 */
class University {
  constructor() {
    this.students = new Map();
    this.nextId = 1;
  }

  /**
   * Adds a new student to the university
   * EFFICIENCY NOTE: O(1) operation - Map insertion
   * 
   * @param {string} name - Student's name
   * @param {string} faculty - Student's faculty
   * @returns {number} - Newly created student's ID
   * 
   * @example
   * const studentId = university.addStudent("John Doe", "Science");
   * console.log(studentId); // 1
   */
  addStudent(name, faculty) {
    const id = this.nextId++;
    const student = new Student(name, faculty);
    this.students.set(id, student);
    return id;
  }

  /**
   * Removes a student from the university
   * EFFICIENCY NOTE: O(1) operation - Map deletion
   * 
   * @param {number} id - Student ID to remove
   * @returns {boolean} - True if student was removed, false if not found
   * 
   * @example
   * university.removeStudent(1); // true
   * university.removeStudent(999); // false
   */
  removeStudent(id) {
    return this.students.delete(id);
  }

  /**
   * Gets a student by ID
   * EFFICIENCY NOTE: O(1) operation - Map lookup
   * 
   * @param {number} id - Student ID
   * @returns {Student|undefined} - Student object or undefined if not found
   */
  getStudent(id) {
    return this.students.get(id);
  }

  /**
   * Calculates the average of all students' grade averages
   * 
   * CHAIN-OF-THOUGHT BREAKDOWN:
   * ============================
   * PROBLEM: Calculate average of all individual student averages
   * 
   * STEP 1: Validate precondition
   *   - Check if university has students
   *   - Return 0 if no students exist
   * 
   * STEP 2: Get all individual student averages
   *   - Map each student to their grade average
   *   - This transforms Student object → number (their avg)
   * 
   * STEP 3: Sum all student averages
   *   - Use reduce to accumulate all averages into single sum
   *   - Reduce is more efficient than nested loops
   * 
   * STEP 4: Calculate mean of the averages
   *   - Divide total sum by number of students
   *   - This gives us the institutional average
   * 
   * STEP 5: Return with proper precision
   *   - Round to 2 decimal places for practical use
   * 
   * COMPLEXITY ANALYSIS:
   * - Time: O(n) where n = number of students (single pass through students)
   * - Space: O(1) - only single accumulator
   * - OPTIMAL: Cannot do better than O(n) as we must read all students
   * 
   * EFFICIENCY NOTE: O(n) operation - single pass through all students
   * 
   * @returns {number} - Average of all students' averages (0 if no students)
   * 
   * @example
   * university.addStudent("Alice", "Science");
   * university.addStudent("Bob", "Engineering");
   * // Alice: grades [80, 90] → avg 85
   * // Bob: grades [70, 80] → avg 75
   * // University avg = (85 + 75) / 2 = 80
   * console.log(university.getStudentsAverageGrades()); // 80
   */
  getStudentsAverageGrades() {
    if (this.students.size === 0) return 0;

    const sumOfAverages = Array.from(this.students.values())
      .map(student => student.getGradesAverage())
      .reduce((sum, avg) => sum + avg, 0);

    return Math.round((sumOfAverages / this.students.size) * 100) / 100;
  }

  /**
   * Finds the student with the highest grade average
   * EFFICIENCY NOTE: O(n) operation - single pass through all students
   * 
   * @returns {Object|null} - Object with { id, student, average } or null if no students
   * 
   * @example
   * const top = university.getMostExcellentStudent();
   * console.log(top.student.name); // "Alice"
   * console.log(top.average); // 95
   */
  getMostExcellentStudent() {
    if (this.students.size === 0) return null;

    let topStudent = null;
    let topAverage = -1;
    let topId = null;

    this.students.forEach((student, id) => {
      const avg = student.getGradesAverage();
      if (avg > topAverage) {
        topAverage = avg;
        topStudent = student;
        topId = id;
      }
    });

    return { id: topId, student: topStudent, average: topAverage };
  }

  /**
   * Returns a string representation of the university
   * 
   * @returns {string} - Formatted university info with all students
   */
  toString() {
    const studentsList = Array.from(this.students.entries())
      .map(([id, student]) => `  ID ${id}: ${student.toString()}`)
      .join('\n');
    
    return `University System:\n${studentsList || '  (No students)'}`;
  }
}

// ============================================
// UNIT TESTS - Student Grade Average
// ============================================

/**
 * Test Suite for Student.getGradesAverage()
 * Verifies correctness and edge cases
 */
function runTests() {
  console.log('=== RUNNING UNIT TESTS ===\n');

  // Test 1: Empty grades
  const student1 = new Student('Test1', 'Science');
  console.log('Test 1 - Empty grades:');
  console.log(`  Expected: 0, Got: ${student1.getGradesAverage()}`);
  console.log(`  PASS: ${student1.getGradesAverage() === 0}\n`);

  // Test 2: Single grade
  const student2 = new Student('Test2', 'Science');
  student2.addGrade(85);
  console.log('Test 2 - Single grade (85):');
  console.log(`  Expected: 85, Got: ${student2.getGradesAverage()}`);
  console.log(`  PASS: ${student2.getGradesAverage() === 85}\n`);

  // Test 3: Multiple grades with simple average
  const student3 = new Student('Test3', 'Science');
  student3.addGrade(80);
  student3.addGrade(90);
  student3.addGrade(70);
  console.log('Test 3 - Multiple grades [80, 90, 70]:');
  console.log(`  Expected: 80, Got: ${student3.getGradesAverage()}`);
  console.log(`  PASS: ${student3.getGradesAverage() === 80}\n`);

  // Test 4: Decimal rounding
  const student4 = new Student('Test4', 'Science');
  student4.addGrade(85);
  student4.addGrade(86);
  console.log('Test 4 - Decimal rounding [85, 86]:');
  console.log(`  Expected: 85.5, Got: ${student4.getGradesAverage()}`);
  console.log(`  PASS: ${student4.getGradesAverage() === 85.5}\n`);

  // Test 5: Negative grade error
  const student5 = new Student('Test5', 'Science');
  console.log('Test 5 - Negative grade validation:');
  try {
    student5.addGrade(-10);
    console.log('  FAIL: Should have thrown an error\n');
  } catch (error) {
    console.log(`  PASS: Error caught - "${error.message}"\n`);
  }

  // Test 6: All zeros
  const student6 = new Student('Test6', 'Science');
  student6.addGrade(0);
  student6.addGrade(0);
  student6.addGrade(0);
  console.log('Test 6 - All zeros [0, 0, 0]:');
  console.log(`  Expected: 0, Got: ${student6.getGradesAverage()}`);
  console.log(`  PASS: ${student6.getGradesAverage() === 0}\n`);

  // Test 7: Perfect scores
  const student7 = new Student('Test7', 'Science');
  student7.addGrade(100);
  student7.addGrade(100);
  student7.addGrade(100);
  console.log('Test 7 - Perfect scores [100, 100, 100]:');
  console.log(`  Expected: 100, Got: ${student7.getGradesAverage()}`);
  console.log(`  PASS: ${student7.getGradesAverage() === 100}\n`);

  console.log('=== TESTS COMPLETE ===\n');
}

// ============================================
// CODE ANALYSIS - University System
// ============================================

/**
 * QUICK CODE ANALYSIS:
 * 
 * STRENGTHS:
 * ✓ O(1) student lookup and removal using Map data structure
 * ✓ Efficient grade average calculation with O(n) single pass
 * ✓ Proper error handling for negative grades
 * ✓ Comprehensive documentation with JSDoc
 * ✓ Clear separation of concerns (Student vs University)
 * ✓ Immutable student ID generation prevents conflicts
 * 
 * AREAS FOR IMPROVEMENT:
 * ⚠ No input validation on names/faculty (could accept empty strings)
 * ⚠ No persistence layer (database/file storage)
 * ⚠ No authentication/authorization system
 * ⚠ Limited error handling for edge cases
 * ⚠ No batch operations for multiple student actions
 * 
 * COMPLEXITY SUMMARY:
 * - addStudent: O(1)
 * - removeStudent: O(1)
 * - getStudent: O(1)
 * - addGrade: O(1)
 * - getGradesAverage: O(n) - optimal
 * - getStudentsAverageGrades: O(n) - optimal
 * - getMostExcellentStudent: O(n) - optimal
 */

// ============================================
// CONVERSION TO PYTHON
// ============================================

/**
 * PYTHON EQUIVALENT CODE:
 * 
 * ```python
 * from typing import Dict, List, Optional, Tuple
 * 
 * class Student:
 *     def __init__(self, name: str, faculty: str):
 *         self.name = name
 *         self.faculty = faculty
 *         self.grades: List[int] = []
 * 
 *     def add_grade(self, grade: int) -> bool:
 *         if grade < 0:
 *             raise ValueError(f"Grade cannot be negative. Received: {grade}")
 *         self.grades.append(grade)
 *         return True
 * 
 *     def get_grades_average(self) -> float:
 *         if not self.grades:
 *             return 0
 *         return round(sum(self.grades) / len(self.grades), 2)
 * 
 *     def change_faculty(self, new_faculty: str) -> str:
 *         old_faculty = self.faculty
 *         self.faculty = new_faculty
 *         return f"Faculty changed from {old_faculty} to {new_faculty}"
 * 
 *     def __str__(self) -> str:
 *         return f"{self.name} ({self.faculty}) - Avg: {self.get_grades_average()}"
 * 
 * class University:
 *     def __init__(self):
 *         self.students: Dict[int, Student] = {}
 *         self.next_id = 1
 * 
 *     def add_student(self, name: str, faculty: str) -> int:
 *         student_id = self.next_id
 *         self.next_id += 1
 *         self.students[student_id] = Student(name, faculty)
 *         return student_id
 * 
 *     def remove_student(self, student_id: int) -> bool:
 *         if student_id in self.students:
 *             del self.students[student_id]
 *             return True
 *         return False
 * 
 *     def get_student(self, student_id: int) -> Optional[Student]:
 *         return self.students.get(student_id)
 * 
 *     def get_students_average_grades(self) -> float:
 *         if not self.students:
 *             return 0
 *         sum_of_averages = sum(
 *             student.get_grades_average() 
 *             for student in self.students.values()
 *         )
 *         return round(sum_of_averages / len(self.students), 2)
 * 
 *     def get_most_excellent_student(self) -> Optional[Tuple[int, Student, float]]:
 *         if not self.students:
 *             return None
 *         best_id = None
 *         best_student = None
 *         best_average = -1
 *         for student_id, student in self.students.items():
 *             avg = student.get_grades_average()
 *             if avg > best_average:
 *                 best_average = avg
 *                 best_student = student
 *                 best_id = student_id
 *         return (best_id, best_student, best_average)
 * ```
 */

// ============================================
// DEMO & EXECUTION
// ============================================

// Create university instance
const uni = new University();

// Add students
console.log('--- ADDING STUDENTS ---');
const id1 = uni.addStudent('Alice Johnson', 'Computer Science');
const id2 = uni.addStudent('Bob Smith', 'Engineering');
const id3 = uni.addStudent('Charlie Brown', 'Science');
console.log(`Added 3 students\n`);

// Add grades
console.log('--- ADDING GRADES ---');
uni.getStudent(id1).addGrade(95);
uni.getStudent(id1).addGrade(92);
uni.getStudent(id1).addGrade(98);

uni.getStudent(id2).addGrade(85);
uni.getStudent(id2).addGrade(88);
uni.getStudent(id2).addGrade(82);

uni.getStudent(id3).addGrade(78);
uni.getStudent(id3).addGrade(80);
uni.getStudent(id3).addGrade(76);
console.log(`Added grades for all students\n`);

// Display university status
console.log('--- UNIVERSITY STATUS ---');
console.log(uni.toString());
console.log();

// Calculate averages
console.log('--- ACADEMIC METRICS ---');
console.log(`University Average: ${uni.getStudentsAverageGrades()}`);
const topStudent = uni.getMostExcellentStudent();
console.log(`Most Excellent Student: ${topStudent.student.name} (ID: ${topStudent.id}) with average ${topStudent.average}`);
console.log();

// Change faculty
console.log('--- FACULTY CHANGE ---');
console.log(uni.getStudent(id1).changeFaculty('Artificial Intelligence'));
console.log();

// Run tests
runTests();