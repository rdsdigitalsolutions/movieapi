const dataSet = [
  {
    title: 'American Justice',
    description: 'American Justice is an American criminal justice television program that aired on the A&E Network, hosted by Bill Kurtis. The show features interesting or notable cases, such as the murder of Selena, Scarsdale Diet doctor murder, the Hillside Stranglers, Matthew Shepard, and the Wells Fargo heist, with the stories told by key players, such as police, lawyers, victims, and the perpetrators themselves. More than 250 episodes were produced, making it the longest-running documentary justice show on cable.',
    date: new Date(),
  },
  {
    title: 'Shipping Wars',
    description: 'Shipping Wars is a reality television series that aired on A&E from January 10, 2012 to April 29, 2015. Season 9 premiered on November 30, 2021 with a new cast of shippers. The show follows various independent shippers who have discovered that money can be made transporting large/bulky/unusual items that traditional carriers either cannot or will not haul. They compete for shipments in timed auctions held by uShip, one of the largest online auction houses for independent shippers',
    date: new Date(),
  }
];

module.exports = function setMovies( Movie ) {
  Movie.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        for (let i=0; i < dataSet.length; i++) {
          new Movie( dataSet[i] )
          .save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'movie' collection");
          });
        }
      }
    });
  }