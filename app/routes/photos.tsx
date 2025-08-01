import { useEffect, useState } from "react";
import Glitch from "~/components/Glitch";
import Header from "~/components/Header";
import ListItem from "~/components/ListItem";

export default function Photos() {

  return (
    <div className="crt">
      <div className="buzz_wrapper" id="main">
        <Glitch>
          <div id="content">
            <Header selectedIndex={2} />
            <main>
              <p className="header">
                +-------------------------+<br/>
                | <span className="cyan">MY_PHOTOS</span> / hexhyperion |<br/>
                +-------------------------+</p>
              <p> </p>

              <p>This section is WIP, will be active as soon as I figure out the best way to embed some gallery here :)</p>
            </main>
            <footer>
              <p>Homepage-inator Mark II<br/>&copy; 2024-{new Date().getFullYear()} Szymon Urbaniak</p>
            </footer>
          </div>
        </Glitch>
      </div>
    </div>
  );
}
