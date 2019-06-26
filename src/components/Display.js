import React from "react";

function Display(props) {
  //console.log(props.fouls);
  return (
    <>
      <h2 title="ballCount">Balls:{props.balls}</h2>
      <h2 title="strikeCount">Strikes:{props.strikes}</h2>
      <h2 title="foulCount">Fouls:{props.fouls}</h2>
      <h2 title="hitCount">Hits:{props.hits}</h2>
    </>
  );
}

export default Display;
