/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const mainPageNewsLimit = 3;

module.exports = {
	
  

  /**
   * `PageController.main()`
   */
  homepage: function (req, res) {

    // Config
    var viewConfig = {
      view: 'homepage',
      layout: 'layout'
    }

    // Find news and return view
    News.find().limit(mainPageNewsLimit).exec(function afterFind(err, news) {

      if(err){

        sails.log.error(err);

        viewConfig.error = err;

        return res.view(viewConfig);

      }else{

        viewConfig.locals = {news: news};

        return res.view(viewConfig);

      }
    })

  },
  
  /**
   * `PageController.publicNews()`
   */
  publicNews: function (req, res) {

    // Config
    var viewConfig = {
        view: 'publicNews',
        layout: 'layout',
        locals: {}
    }

    // Find news and return view
    News.find().exec(function afterFind(err, news) {

      if(err){

        sails.log.error(err);

        viewConfig.error = err;

        return res.view(viewConfig);

      }else{

        viewConfig.locals.news = news;

        return res.view(viewConfig);

      }
    })

  },
  
  /**
   * `PageController.publicNews()`
   */
  publicNewsID: function (req, res) {

    // Config
    var viewConfig = {
          view: 'publicNewsID',
          layout: 'layout',
          locals: {},
          newsID: req.param('id')
        }
    

    // Find news and return view
    News.findOne({id: viewConfig.newsID}).exec(function afterFind(err, news) {

      if(err){

        sails.log.error(err);

        viewConfig.error = err;

        return res.view(viewConfig);

      }else{

        viewConfig.locals.news = news;

        return res.view(viewConfig);

      }
    })

  },
  
  code: function (req, res) {

    // Config
    var viewConfig = {
      view: 'code',
      layout: 'layout'
    }

    return res.view(viewConfig);
  },

  dashboard: function (req, res) {

    // Config
    var userID; //hae tähän jostain esim req tai res käyttäjän id
    var viewConfig = {
      view: 'dashboard',
      layout: 'layoutDashboard',
      locals: {
        numberOfTotalNews: '',
        numberOfUserNews: '',
        news: ' '
      }
    }
    

    News.find().exec(function afterFind(err, news) {
      console.log("Number of news: " + news.length);
      viewConfig.locals.numberOfTotalNews = news.length;
      console.log("news: " + JSON.stringify(news));
      
      News.find().where({'author':req.user.username}).exec(function afterFind(err, news) {
        viewConfig.locals.numberOfUserNews = news.length;
        return res.view(viewConfig);
      }
    )})
    
    
  },

  codeManage: function (req, res) {

    // Config
    var viewConfig = {
      view: 'codeManage',
      layout: 'layoutDashboard'
    }

    Token.find().exec(function afterFind(err, codes) {

      if(err){

        sails.log.error(err);

        viewConfig.error = err;

        return res.view(viewConfig);

      }

      if(codes.length > 0){
        sails.log.info('PageController:CodeManage - found editable codes: ' + codes);
      }else{
        sails.log.info('PageController:CodeManage - no codes');
      }

      

      viewConfig.locals = {codes: codes};

      return res.view(viewConfig);
    })

    
  },

  news: function (req, res) {

    // Config
    var viewConfig = {
      view: 'news',
      layout: 'layoutDashboard'
    }

    // Find news and return view
    News.find().exec(function afterFind(err, news) {

      if(err){

        sails.log.error(err);

        viewConfig.error = err;

        return res.view(viewConfig);

      }else{

        viewConfig.locals = {news: news};

        return res.view(viewConfig);

      }
    })
  },

  newsEdit: function (req, res) {

    // Config
    var viewConfig = {
      view: 'newsEdit',
      layout: 'layoutDashboard'
    }

    var id = req.param('id');

    // Find news and return view
    News.findOne({id: id}).exec(function afterFind(err, news) {

      if(err){

        sails.log.error(err);

        viewConfig.error = err;

        return res.view(viewConfig);

      }else{

        sails.log.info('PageController:newsEdit - found editable news: ' + news);

        viewConfig.locals = {news: news};

        return res.view(viewConfig);

      }
    })
  },

  newsCreate: function (req, res) {

    // Config
    var viewConfig = {
      view: 'newsCreate',
      layout: 'layoutDashboard',
      locals: {
        author: req.user.username
      }
    }

    return res.view(viewConfig);
    
  },

};

