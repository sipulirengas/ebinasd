/**
 * News.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	topic: 			   { type: 'string', required: true },
  	content: 		   { type: 'text', required: true },
  	description: 	 { type: 'string', required: true },
  	image: 			   { type: 'string' },
  	externalLink:  { type: 'string' },
    author:        { type: 'string' }
  	//event: 			{ model: 'event' }
    
  }
  
};