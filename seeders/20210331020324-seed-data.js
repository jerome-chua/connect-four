module.exports = {
  up: async (queryInterface) => {
    const userData = [
      {
        username: 'jerome91',
        email: 'jerome@test.com',
        password: '7ef6d7c225edda57aa6aef8c3ebf70b7b7822a9d9d18060b326985b0b64f26bd082e9529c5dd2fadc17fd98bf82662293f8d35dd78dbc53d07a213badf1ccf8f',
        wins: 4,
        rank: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'chua91',
        email: 'chua@test.com',
        password: '08b1e7004437972fc0082017e307163d5b05aed5c4b69c76ff4450ed96b0224ed31c3e5911ad5f5da096e2e6cb8b1454af63e6e847eb4d2f9f150c80b4992eaa',
        wins: 2,
        rank: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'jamus81',
        email: 'jamus@test.com',
        password: '08b1e7004437972fc0082017e307163d5b05aed5c4b69c76ff4450ed96b0224ed31c3e5911ad5f5da096e2e6cb8b1454af63e6e847eb4d2f9f150c80b4992eaa',
        wins: 1,
        rank: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'peter32',
        email: 'peter@test.com',
        password: '08b1e7004437972fc0082017e307163d5b05aed5c4b69c76ff4450ed96b0224ed31c3e5911ad5f5da096e2e6cb8b1454af63e6e847eb4d2f9f150c80b4992eaa',
        wins: 0,
        rank: 4,
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
