// EMAIL
export function isValidEmail(
  email
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);
}

// PASSWORD
export function isValidPassword(
  password
) {

  return (
    password &&
    password.length >= 6
  );
}

// URL
export function isValidUrl(
  url
) {

  if (!url) {
    return true;
  }

  try {

    new URL(url);

    return true;

  } catch {

    return false;
  }
}

// CGPA
export function isValidCGPA(
  cgpa
) {

  const value =
    Number(cgpa);

  return (
    value >= 0 &&
    value <= 10
  );
}

// STIPEND
export function isValidStipend(
  stipend
) {

  return (
    Number(stipend) >= 0
  );
}

// OPENINGS
export function isValidOpenings(
  openings
) {

  return (
    Number(openings) >= 1
  );
}

// REQUIRED FIELD
export function isRequired(
  value
) {

  return value
    ?.toString()
    ?.trim()
    ?.length > 0;
}

// SKILLS ARRAY
export function hasSkills(
  skills
) {

  return (
    Array.isArray(
      skills
    ) &&
    skills.length > 0
  );
}