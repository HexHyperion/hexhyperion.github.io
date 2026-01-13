import { useState, useEffect, useRef } from "react";
import Glitch from "./Glitch";
import ListItem, { RepoData } from "./ListItem";

export default function Home() {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  const LOCAL_STORAGE_KEY = "hexhyperion_repos";
  const LOCAL_STORAGE_TIME_KEY = "hexhyperion_repos_time";

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

  const fetchRepos = async () => {
    try {
      const response = await fetch("https://api.github.com/users/hexhyperion/repos");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setRepos(data);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_STORAGE_TIME_KEY, Date.now().toString());
    }
    catch (error) {
      console.error("Failed to fetch repositories:", error);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    const cachedTime = localStorage.getItem(LOCAL_STORAGE_TIME_KEY);
    const now = Date.now();
    if (cached && cachedTime && now - parseInt(cachedTime) < 5 * 60 * 1000) {
      try {
        setRepos(JSON.parse(cached));
      }
      catch {
        fetchRepos();
      }
    }
    else {
      fetchRepos();
    }
  }, []);


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const onScroll = () => {
      scrollContainer.classList.add('scrolling');
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollContainer.classList.remove('scrolling');
      }, 200);
    };
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollContainer.removeEventListener('scroll', onScroll as EventListener);
    };
  }, []);

  return (
    <div className="crt">
      <div className="buzz_wrapper" id="main" ref={scrollRef}>
        <Glitch>
          <div id="content">
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
                  Mainly you'd see me working with various flavors and applications of JS/TS, but I touch some native mobile dev, C++, C# and (God forbid) Python from time to time. We'll see in what years' time I'll sit down to learn Rust and Java as I planned...<br/><br/>
                  After losing all my brain cells working with JavaScript, I sometimes happen to accidentally touch grass while running around with a camera, taking some (or trying to do so) creative documentary and artistic photos, which you can find on my IG and Flickr below!<br/><br/>
                  I also love myself some good ol' American cars, fast bikes, classic rock/metal and Japanese swords, however weird this combination may seem... I'm a big Star Wars fan, too, swinging glowing sticks at things and spitting random quotes at every possible occasion :D<br/><br/>
                  If you'd like to see my questionable art, either in text or pixels, look down!
                </p>

                <p className="header"> </p>
                <p className="header">MY SOCIALS</p>
                <p className="header">----------</p>
                <p>Facebook -&gt; <a href="https://www.facebook.com/urb.szymon" target="_blank">urb.szymon</a></p>
                <p>Instagram -&gt; <a href="https://www.instagram.com/urb.szymon" target="_blank">urb.szymon</a></p>
                <p>Flickr -&gt; <a href="https://www.flickr.com/photos/urbszymon" target="_blank">urb.szymon</a></p>
                <p>GitHub -&gt; <a href="https://github.com/hexhyperion" target="_blank">hexhyperion</a></p>
                <p>Discord -&gt; <a href="https://discordapp.com/users/764099018811768852" target="_blank">hexhyperion</a></p>
                <p>Steam -&gt; <a href="https://steamcommunity.com/id/hexhyperion" target="_blank">hexhyperion</a></p>
                <p>LinkedIn -&gt; <a href="https://www.linkedin.com/in/szymon-urbaniak/" target="_blank">Szymon Urbaniak</a></p>

                <p className="header"> </p>

                <p className="header">MY PROJECTS<br/>-----------</p>
                <p>Here you can see all my school and personal programming projects, automatically fetched from my GitHub using their REST API. Some of those are deployed on GH Pages as well, in those cases you can find a link to the web version next to the GH one.</p>

                <div className="list">
                  {repos && repos.length > 0 ? (
                    repos.map((repo) => (
                      <ListItem key={repo.id} data={repo} />
                    ))
                  ) : (
                    <p>No repositories found.</p>
                  )}
                </div>
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
