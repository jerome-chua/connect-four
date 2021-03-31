export default function initGameModel(sequelize, DataTypes) {
  return sequelize.define(
    'Game',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      boardState: {
        type: DataTypes.JSON,
      },
      gameFinished: {
        type: DataTypes.BOOLEAN,
      },
      playeridTurn: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      winnerId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    },
  );
}
