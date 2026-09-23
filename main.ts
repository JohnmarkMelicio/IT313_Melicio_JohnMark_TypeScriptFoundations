import {
  EnrollmentStatus,
  computeAverage
} from "./gradeUtils.js";

import getStatus from "./gradeUtils.js";

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

const enrollees: Enrollee[] = [
  {
    name: "Ana Cruz",
    prelim: 85,
    midterm: 90,
    final: 88
  },
  {
    name: "Bea Santos",
    prelim: 70,
    midterm: 65,
    final: 60
  },
  {
    name: "Cid Ramos",
    prelim: 95,
    midterm: 92,
    final: 97
  },
  {
    name: "Dex Alonzo",
    prelim: 60,
    midterm: 55,
    final: 50
  },
  {
    name: "Eli Tan",
    prelim: 78,
    midterm: 80,
    final: 76
  }
];

function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 500);
  });
}

let batchId: string | number =
  Math.random() > 0.5
    ? "IT313-2026"
    : 2026;

if (typeof batchId === "string") {
  console.log(`Batch ID: ${batchId.toUpperCase()}`);
} else {
  console.log(`Batch ID: ${batchId.toFixed(0)}`);
}

function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {} as Record<string, T[]>);
}

async function main(): Promise<void> {
  try {
    const records = await getEnrollees();

    const reports: EligibilityReport[] = records.map(
      (enrollee) => {
        const {
          name,
          prelim,
          midterm,
          final
        } = enrollee;

        const average = computeAverage(
          prelim,
          midterm,
          final
        );

        const status = getStatus(average);

        return {
          name,
          average,
          status,
          ...(status === EnrollmentStatus.Probation
            ? {
                remarks: "Needs consultation"
              }
            : {})
        };
      }
    );

    const classAverage =
      reports.reduce(
        (total, report) =>
          total + report.average,
        0
      ) / reports.length;

    const groupedReports = groupBy(
      reports,
      (report) => report.status
    );

    const passingCount =
      groupedReports[
        EnrollmentStatus.Passing
      ]?.length ?? 0;

    console.log(
      "=== IT313 Enrollment Eligibility Report (TypeScript) ==="
    );

    reports.forEach((report) => {
      const remark = report.remarks
        ? ` - ${report.remarks}`
        : "";

      console.log(
        `${report.name} - Average: ${report.average.toFixed(
          2
        )} - ${report.status}${remark}`
      );
    });

    console.log(
      `Class Average: ${classAverage.toFixed(2)}`
    );

    console.log(
      `Passing: ${passingCount} / ${reports.length}`
    );
  } catch (error) {
    console.error(
      "Failed to retrieve enrollee records.",
      error
    );
  }
}

main();