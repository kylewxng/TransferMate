export function computeUnitsFromData(data) {
  const courseUnits = data.courses?.reduce((sum, c) => {
    const u = parseFloat(c.units) || 0;
    const g = c.grade;
    if (g === "A") return sum + u;
    if (g === "B") return sum + Math.max(0, u - 1);
    if (g === "C") return sum + Math.max(0, u - 2);
    if (g === "D" || g === "F") return sum + 0;
    return sum;
  }, 0) || 0;

  const ap = (data.apExams?.length || 0) * 5.3;
  const ib = (data.ibExams?.length || 0) * 5.3;
  const misc = parseFloat(data.miscUnits || 0);
  const total = courseUnits + ap + ib + misc;

  return {
    ucCourses: { completed: courseUnits, total: courseUnits },
    apExams: { completed: ap, total: ap },
    ibExams: { completed: ib, total: ib },
    miscUnits: misc,
  };
}
