module.exports = {
  up: async (queryInterface) => {
    const userData = [
      {
        username: 'jerome91',
        email: 'jerome@test.com',
        password: '9c3125a008064087e6d93acf34289862fd3a625256787183f3b05ed503050809',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'chua91',
        email: 'chua@test.com',
        password: '0c4e438c22b64da2d6c8b0e2e47bab39804ff7e57c96fd863fc5b852cddf8e33',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', userData);
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('users', null, {});
  },
};
