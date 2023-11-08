async function publisherAndGenreLogic(publishers) {
  try {
    const publishersFromBooks = await Books.findAll({
      attributes: [[Sequelize.col("Publisher_ID.Name"), "Publisher"], "Genre"],
      include: [
        {
          model: Publishers,
          as: "Publisher_ID",
          required: true,
          where: {
            Name: publishers,
          },
          attributes: ["Genre_Speciality"],
        },
      ],
      where: Sequelize.literal(
        '("Books"."Genre" = "Publisher_ID"."Genre_Speciality")'
      ),
    });
    console.log("PUblisher From books ", publishersFromBooks);
    return {
      Publisher: publishers,
      Books: publishersFromBooks,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
