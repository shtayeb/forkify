import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // pollyfill async await

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // update result view to mark selected reciper
    resultsView.update(model.getSearchResultsPage());

    // 1 - Loading Recipe
    await model.loadRecipe(id);

    // 2 - Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // console.log(error)
    recipeView.renderError(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    // render results
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {number} gotoPage
 */
const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));

  paginationView.render(model.state.search);
};

/**
 *
 * @param {number} newServings
 */
const controlServings = function (newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);
  // update the recipeView
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
