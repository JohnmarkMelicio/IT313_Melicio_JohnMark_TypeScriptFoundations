# IT313 TypeScript Foundations

## Laboratory 3 - Enrollment Eligibility Checker

This project is a TypeScript version of the Enrollment Eligibility Checker
developed in Laboratory 2.

The program calculates the average grade of each enrollee and determines
whether the student is PASSING or on PROBATION.

The passing standard is an average of 75 or above.

## TypeScript Concepts Used

### 1. Basic Type Annotations

The program uses types such as:

- string
- number
- Promise
- void

Example:

```typescript
function computeAverage(
  prelim: number,
  midterm: number,
  final: number
): number