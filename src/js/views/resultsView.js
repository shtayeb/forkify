import previewView from './previewView';
import View from './view';
// @ts-ignore
import icons from 'url:../../img/icons.svg'; // parcel 2

class ResultsView extends View {
  /**
   * @type {Array<import('../model').Recipe>}
   */
  _data = []; // initialize _data as an array

  /**
   * @type {HTMLElement}
   */
  _parentElement = document.querySelector('.results');

  /**
   *
   * @returns {string}
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
