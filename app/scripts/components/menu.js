/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import axios from "axios";
import React from "react";
import SearchFilter from "./SearchFilter";

class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      filterData: [],
      searchValue: "",
    };
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.props.setSearch(!this.props.showingSearch)
    this.setState({
      filterData: !this.props.showingSearch ? this.state.filterData : [],
      searchValue: !this.props.showingSearch ? this.state.searchValue : "",
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  async onSearch(e) {
    // Start Here
    // ...
    const value = e.target.value;
    this.setState({ searchValue: value });
    if (value) {
      const response = await axios.get(`http://localhost:3035/api/get-data?q=${value}`);
      if (response?.data?.length > 0) {
        this.setState({
          filterData: response.data,
        });
      } else {
        this.setState({
          filterData: [],
        });
      }
    }else {
      this.setState({
        filterData: [],
      });
    }
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    const {showingSearch} = this.props
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div className={(showingSearch ? "showing " : "") + "search-container"}>
          <input type="text" onChange={(e) => this.onSearch(e)} value={this.state.searchValue} />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>
        </div>
        {this.state.filterData.length > 0 && <SearchFilter filterData={this.state.filterData} />}
      </header>
    );
  }
}

// Export out the React Component
export default Menu;
