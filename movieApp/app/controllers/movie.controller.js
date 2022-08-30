const queue = require("../helpers/queue");
const db = require("../models");
const Movie = db.movie;
const queueName = 'movies';

// @todo: Process and validate all the data here.
const processRequest = ( req ) => ( {
  ...(req.body.title && { title: req.body.title.slice(0, 250) } ),
  ...(req.body.description && { description: req.body.description.slice(0, 800) } ),
  ...(req.body.date && { date: new Date( req.body.date ) } ),
} );

exports.fetch = (req, res) => {
  // @todo: Format response before returning.
  Movie.find()
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json( { results: data } );
    });
};

exports.create = (req, res) => {
  if( !req.body.title || !req.body.description || !req.body.date ){
    res.status(400).send({ message: 'Title, description and date are required!' });
    return;
  }

  const document = processRequest(req);

  Movie.create( document, (err, data) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    queue( { queueName, message: JSON.stringify( { message: 'Document Created', document } ), callback: () => {
      res.status(204).send('Success');
    } } );
  } );
};

exports.duplicate = (req, res) => {
  Movie.findOne( { _id: req.params.id } )
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      this.create( { body: {
            title: `Copy - ${data.title}`,
            description: data.description,
            date: new Date( data.date || (new Date()).toString() ), 
          }}, res);
    });
};

exports.update = (req, res) => {
  if( !req.body.title && !req.body.description && !req.body.date ){
    res.status(400).json({ message: 'Title or description or date are required!' });
    return;
  }

  const document = processRequest(req);

  Movie.findOneAndUpdate( { _id: req.params.id }, document, {upsert: false} )
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      
      queue( { queueName, message: JSON.stringify( { message: 'Document Updated', document } ), callback: () => {
        res.status(204).send('Success');
      } } );
    });
};

exports.delete = (req, res) => {
  Movie.deleteOne({ _id: req.params.id })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      
      queue( { queueName, message: JSON.stringify( { message: 'Document Deleted', document: { id: req.params.id } } ), callback: () => {
        res.status(204).send('Success');
      } } );
    });
};
