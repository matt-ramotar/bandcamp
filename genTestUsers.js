const genTestUsers = () => {
  let arr = [];

  for (let i = 1; i < 10; i++) {
    arr.push({
      email: `email-${i}@email.com`,
      firstName: `first-${i}`,
      lastName: `last-${i}`,
      hashedPassword: `hashed-${i}`,
      createdAt: 'new Date',
      updatedAt: 'new Date',
    });
  }
  return arr;
};

console.log(genTestUsers());
