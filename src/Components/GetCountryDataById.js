import React from "react";

// If you inspect the re-renders you will see that this components does some unnecessary re-renders. You can avoid that by using PureComponent https://reactjs.org/docs/react-api.html#reactpurecomponent
export default class GetCountryDataById extends React.PureComponent {
  render() {
    return (
      <div>
        <ul>
          {/* Do not use single letter variables like "c" */}
          { this.props.CurrentCountryData.map(c => <li key={c.Country}>{c.Cases}</li>) }
        </ul>
      </div>
    );
  }
}
