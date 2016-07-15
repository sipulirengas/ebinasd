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

    News.find().limit(mainPageNewsLimit).exec(function afterFind(err, news) {

      if(err){

        sails.log.error(err);

        return res.view({
          view: 'homepage',
          layout: 'layout',
          error: err
        });

      }

      return res.view({
        view: 'homepage',
        layout: 'layout',
        locals: {
          news: news
        }
      });

    })

  },

  /**
   * `PageController.dashboard()`
   */
  dashboard: function (req, res) {
    return res.view({
      view: 'dashboard',
      layout: 'layoutDashboard'
    });
  },

};

