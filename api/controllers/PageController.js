/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const mainPageNewsLimit = 10;

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
   * `PageController.dashboard()`
   */
  dashboard: function (req, res) {

    // Config
    var viewConfig = {
      view: 'dashboard',
      layout: 'layoutDashboard'
    }

    return res.view(viewConfig);
  },

  /**
   * `PageController.dashboard()`
   */
  news: function (req, res) {

    // Config
    var viewConfig = {
      view: 'news',
      layout: 'layoutDashboard'
    }

    return res.view(viewConfig);
  },

};

