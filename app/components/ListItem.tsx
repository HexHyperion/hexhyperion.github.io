import { useState, useEffect } from "react";

export type RepoData = {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  html_url: string;
};

export default function ListItem({ data }: { data: RepoData }) {
  const [siteExists, setSiteExists] = useState<boolean | null>(null);

  const makePagesUrl = (name: string) => {
    return `https://hexhyperion.github.io/${name}`;
  };

  const makeHeaderSeparator = (length: number) => {
    return "-".repeat(length);
  };

  useEffect(() => {
    const checkSiteExists = async () => {
      try {
        const response = await fetch(makePagesUrl(data.name), {
          method: "HEAD",
        });
        setSiteExists(response.status !== 404);
      }
      catch {
        setSiteExists(true);
      }
    };
    checkSiteExists();
  }, []);

  return (
    <div className="list-item">
      <p className="header">{data.name}<br/>{makeHeaderSeparator(data.name.length)}</p>
      <p>{data.description}</p>
      <p className="space-top"><span className="cyan">{data.language}</span> / {data.stargazers_count} stars</p>
      <p className="space-top">[<a href={data.html_url}>view_gh</a>]{siteExists ? <span> / [<a href={makePagesUrl(data.name)}>view_web</a>]</span> : null}</p>
    </div>
  );
}
