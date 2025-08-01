import Glitch from "~/components/Glitch";
import Header from "~/components/Header";

export default function Home() {
  const getMyAge = () => {
    const birthDate = new Date("2007-11-29");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="crt">
      <div className="buzz_wrapper" id="main">
        <Glitch>
          <div id="content">
            <Header selectedIndex={0} />
            <main>
                <p className="header">
                  +------------------------+<br/>
                  | <span className="cyan">SZYMON_U</span> / hexhyperion |<br/>
                  +------------------------+</p>
                <p> </p>
                <p className="header">ABOUT ME</p>
                <p className="header">--------</p>
                <p>
                  <span title="General Kenobi...">Hello there!</span> I'm a random {getMyAge()}-year-old guy from Poland fascinated with technology, automotive and computer science, who ended up programming things in school :P<br/>
                  Mainly you'd see me working with various flavors and applications of JS/TS, but I touch some C++, C# and (God forbid) Python from time to time. We'll see in what years' time I'll sit down to learn Rust, Java and Kotlin as I planned...<br/><br/>
                  After losing all my brain cells working with JavaScript, I sometimes happen to accidentally touch grass while running around with a camera, taking some (mildly) creative documentary and artistic photos, which you can find on my IG and Flickr below!<br/><br/>
                  I also love myself some good ol' American cars, fast bikes, classic rock and swords, however weird this combination may seem... I'm a big Star Wars fan, too, swinging glowing sticks at things and spitting random quotes at every possible occasion :D<br/><br/>
                  If you'd like to see my questionable art, either in text or pixels, use the menu at the top of the page!</p>

                <p className="header"> </p>
                <p className="header">MY SOCIALS</p>
                <p className="header">----------</p>
                <p>Facebook -&gt; <a href="https://www.facebook.com/urb.szymon" target="_blank">urb.szymon</a></p>
                <p>Instagram -&gt; <a href="https://www.instagram.com/urb.szymon" target="_blank">urb.szymon</a></p>
                <p>Flickr -&gt; <a href="https://www.flickr.com/photos/urbszymon" target="_blank">urb.szymon</a></p>
                <p>GitHub -&gt; <a href="https://github.com/hexhyperion" target="_blank">hexhyperion</a></p>
                <p>Discord -&gt; <a href="https://discordapp.com/users/764099018811768852" target="_blank">hexhyperion</a></p>
                <p>LinkedIn -&gt; <a href="https://www.linkedin.com/in/szymon-urbaniak/" target="_blank">Szymon Urbaniak</a></p>
                <p>Steam -&gt; <a href="https://steamcommunity.com/id/hexhyperion" target="_blank">hexhyperion</a></p>
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
