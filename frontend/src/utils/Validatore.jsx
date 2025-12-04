//validation for user input fields

export const Validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  password: (password) => {
    // 8-16 chars, 1 uppercase, 1 special char
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;
    return regex.test(password);
  },
  name: (name) => name.length >= 3 && name.length <= 60,
  address: (address) => address.length <= 400,
};
