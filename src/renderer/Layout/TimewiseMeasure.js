/* global musje, Snap */

(function (musje, Snap) {
  'use strict';

  /**
   * TimewiseMeasure Layout mixin.
   * @mixin
   */
  musje.LayoutTimewiseMeasure =
  /** @lends musje.LayoutTimewiseMeasure# */
  {
    /**
     * Calculate minimum measure width.
     * @return {number} The minimum measure width.
     */
    calcMinWidth: function () {
      var lo = this.layout.options, minWidth = 0;

      this.parts.forEach(function (cell) {
        minWidth = Math.max(minWidth, cell.minWidth);
      });

      this._padding = lo.measurePaddingLeft + lo.measurePaddingRight;
      this.minWidth = minWidth + this._padding;
    },

    /**
     * Flow the measure.
     */
    flow: function () {
      var measure = this;
      measure.parts = measure.parts.map(function (cell) {

        /**
         * Cell SVG group element
         * @memberof musje.LayoutCell#
         * @alias el
         * @type {Element}
         * @readonly
         */
        cell.el = measure.el.g().addClass('mus-cell');

        cell.height = measure.height;
        cell._x = measure.barLeftInSystem.width / 2 +
                  measure.layout.options.measurePaddingRight;

        cell.y2 = measure.system.height;

        // cell.drawBorder();

        return cell;
      });
    },

    system: {
      get: function () {
        return this._s;
      },
      set: function (system) {
        this._s = system;
        this.el = system.el.g().addClass('mus-measure');
        this.height = system.height;
      }
    },

    width: {
      get: function () {
        return this._w;
      },
      set: function (w) {
        this._w = w;
        var padding = this._padding;
        this.parts.forEach(function (cell) {
          cell.width = w - padding;
        });
      }
    },

    x: {
      get: function () {
        return this._x;
      },
      set: function (x) {
        this._x = x;
        this.el.transform(Snap.matrix().translate(x, 0));
      }
    },

    barLeftInSystem: {
      get: function () {
        return this.parts[0].barLeftInSystem;
      }
    },

    barRightInSystem: {
      get: function () {
        return this.parts[0].barRightInSystem;
      }
    }
  };

  musje.defineProperties(musje.TimewiseMeasure.prototype,
                         musje.LayoutTimewiseMeasure);

}(musje, Snap));
