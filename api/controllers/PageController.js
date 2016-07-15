/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `PageController.dashboard()`
   */
  dashboard: function (req, res) {
    return res.view({
      view: 'dashboard',
      layout: 'layoutDashboard'
    });
  }
};

