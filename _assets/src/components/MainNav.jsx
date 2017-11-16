import React from 'react';
import DocumentStore from '../flux/documentStore';

class MainNav extends React.Component {

  constructor() {
    super();

    this.state = {
      pagesArray: DocumentStore.getPageNavigation(),
    };
  }

  render() {
    return (
      <nav className="site-nav">
        <ul>
          {this.state.pagesArray.map((page) => {
            if (page.ID !== 2) {
              return (
                <li key={page.ID}>
                  <a href={page.permalink}>
                    <span>
                      {page.post_title}
                    </span>
                  </a>
                </li>
              );
            }
            return false;
          }, this)}
        </ul>
      </nav>
    );
  }
}

export default MainNav;
