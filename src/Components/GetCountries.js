import React from "react";
import axios from "axios";
import GetCountryDataById from "./GetCountryDataById";

// Using React.Component to create components is absolutely fine, but React is moving away from it towards a more functional approach
// Take a look at this page to react about "Function components" vs "Class components" https://reactjs.org/docs/components-and-props.html
export default class GetCountries extends React.Component {
  // In class components (the one created using React.Component) this is the right way to define your state.
  // Function components tho, since they are not classes, do not support this approach. That's why React implemented the concept of "Hooks" which are
  // a super declarative and powerful way to manage state and other functionalities.
  // I'd suggest you read about them here and try to refactor your code to use them https://reactjs.org/docs/hooks-intro.html
  state = {
    // I would recomment that you instanciate your state with all the properties it might have - React dosn't require it, but it's very helpful for who reads your code to be able
    // too look at the definition of your state and be able to immediately understand what are all the state properties a component has
    // isLoading: false,
    Countries: [],
    SelectedCountry: [],
  };

  componentDidMount() {
    axios.get(`https://api.covid19api.com/countries`).then((res) => {
      this.setState({ Countries: res.data });
    });
  }

  handleChange = (event) => {
    // It's a very common JS pattern to use camelCase to name variables, functions and pretty much anything. I'd recommend you follow the same
    // pattern (so it would be currentCountry instead of CurrentCountry, isLoading instead of IsLoading) since starting with a uppercase letter usually is reserved for Constructors "https://css-tricks.com/understanding-javascript-constructors/"
    const CurrentCountry = event.target.value;
    this.setState({ IsLoading: true }, () => {
      axios
        .get(
          `https://api.covid19api.com/total/dayone/country/${CurrentCountry}/status/confirmed`
        )
        .then((result) =>
          this.setState({
            IsLoading: false,
            SelectedCountry: [...result.data],
          })
        );
    });
  };

  render() {
    return (
      <div>
        <select onChange={this.handleChange}>
          {this.state.Countries.map((Country) => (
            // Be very mindful of using a "key" that is unique since React deeply relies on it to optimize rerenders/performance. (Your "key" is not unique at the moment, check you console for a React warning)
            <option value={Country.Slug} key={Country.Slug}>
              {Country.Country}
            </option>
          ))}
        </select>
        {this.state.IsLoading ? (
          <p>Loading</p>
        ) : (
          <GetCountryDataById CurrentCountryData={this.state.SelectedCountry} />
        )}
      </div>
    );
  }
}
