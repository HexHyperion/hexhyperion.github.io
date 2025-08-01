import { useEffect, useState } from "react";
import Glitch from "~/components/Glitch";
import Header from "~/components/Header";
import ListItem from "~/components/ListItem";
import type { RepoData } from "~/components/ListItem";

export default function Repos() {
  const [repos, setRepos] = useState<RepoData[]>([]);

  const LOCAL_STORAGE_KEY = "hexhyperion_repos";
  const LOCAL_STORAGE_TIME_KEY = "hexhyperion_repos_time";

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

  return (
    <div className="crt">
      <div className="buzz_wrapper" id="main">
        <Glitch>
          <div id="content">
            <Header selectedIndex={1} />
            <main>
              <p className="header">
                +---------------------------+<br/>
                | <span className="cyan">CS_PROJECTS</span> / hexhyperion |<br/>
                +---------------------------+</p>
              <p> </p>

              <p>Here you can see all my school and personal programming projects, automatically fetched from my GitHub using their REST API. Some of those are deployed on GH Pages as well, in those cases you can find a link to the web version next to the GH one.</p>

              <p className="header"> </p>

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
