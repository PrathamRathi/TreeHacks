export default function calulateGrade(percent) {
  if (percent <= 100 && percent >= 90) {
    return "A";
  } else if (percent >= 80 && percent < 90) {
    return "B";
  } else if (percent >= 70 && percent < 80) {
    return "C";
  } else if (percent >= 60 && percent < 70) {
    return "D";
  } else {
    return "F";
  }
}
