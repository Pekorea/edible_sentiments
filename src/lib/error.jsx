export function error(message) {
    console.log(message);
    switch (message) {
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      case "auth/user-not-found":
        return "User not found";
      case "auth/invalid-credential":
        return "Wrong Details";
      case "auth/email-already-in-use":
        return "User already exists";
      case "auth/wrong-password":
        return "email or password is incorrect";
  
      default:
        return "something went wrong check your internet connection";
    }
  }
  