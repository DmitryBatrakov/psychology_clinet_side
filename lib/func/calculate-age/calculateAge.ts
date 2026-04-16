/**
 * Calculates a person's age in years from an ISO date string (e.g. "1990-05-20").
 * Returns null if the value is missing or unparseable.
 */
export function calculateAge(birthDate: string | null | undefined): number | null {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;

    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();

    const hasHadBirthdayThisYear =
        now.getMonth() > birth.getMonth() ||
        (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());

    if (!hasHadBirthdayThisYear) age -= 1;

    return age;
}
