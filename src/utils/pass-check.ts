function checkPasswordStrength(password: string): string {
  const weakRegex = /^.{1,8}$/; // Password length is 1 to 5 characters
  const mediumRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/; // Contains both letters and digits, length 6 to 10
  const strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{11,}$/; // Contains digits, lowercase, uppercase, special characters, length 11 or more

  if (strongRegex.test(password)) {
    return "strong";
  } else if (mediumRegex.test(password)) {
    return "medium";
  } else if (weakRegex.test(password)) {
    return "weak";
  } else {
    return "weak";
  }
}

export default checkPasswordStrength;
