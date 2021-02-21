import React from "react";
function App(props) {
  const { data, value, onChange } = props;
  return (
    <select onChange={onChange} className={props.className} value={value}>
      {data.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}

export default App;
