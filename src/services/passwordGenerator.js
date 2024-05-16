const generatePassword = () => {
  try {
    while (true) {
      let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let password = '';
      for (let i = 6; i > 0; --i) {
        let rand = Math.round(Math.random() * (chars.length - 1))
        password += chars[rand];
      }
      return password
    }
  } catch (err) {
    console.log(err);
  }
}


console.log(generatePassword());