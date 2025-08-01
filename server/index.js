import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("title", {
        children: "HH / mainpage"
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Glitch({ children }) {
  const layers = [0, 1, 2, 3];
  return /* @__PURE__ */ jsx("div", { className: "glitch", children: layers.map((i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "glitch-layer",
      "aria-hidden": "true",
      style: { pointerEvents: "auto" },
      children
    },
    i
  )) });
}
function Header({ selectedIndex }) {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: selectedIndex === 0 ? "active" : "", children: "HOME" }),
    /* @__PURE__ */ jsx("a", { href: "/repos", className: selectedIndex === 1 ? "active" : "", children: "cs_projects" }),
    /* @__PURE__ */ jsx("a", { href: "/photos", className: selectedIndex === 2 ? "active" : "", children: "my_photos" })
  ] });
}
function ListItem({ data }) {
  const [siteExists, setSiteExists] = useState(null);
  const makePagesUrl = (name) => {
    return `https://hexhyperion.github.io/${name}`;
  };
  const makeHeaderSeparator = (length) => {
    return "-".repeat(length);
  };
  useEffect(() => {
    const checkSiteExists = async () => {
      try {
        const response = await fetch(makePagesUrl(data.name), {
          method: "HEAD"
        });
        setSiteExists(response.status !== 404);
      } catch {
        setSiteExists(true);
      }
    };
    checkSiteExists();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "list-item", children: [
    /* @__PURE__ */ jsxs("p", { className: "header", children: [
      data.name,
      /* @__PURE__ */ jsx("br", {}),
      makeHeaderSeparator(data.name.length)
    ] }),
    /* @__PURE__ */ jsx("p", { children: data.description }),
    /* @__PURE__ */ jsxs("p", { className: "space-top", children: [
      /* @__PURE__ */ jsx("span", { className: "cyan", children: data.language }),
      " / ",
      data.stargazers_count,
      " stars"
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "space-top", children: [
      "[",
      /* @__PURE__ */ jsx("a", { href: data.html_url, children: "view_gh" }),
      "]",
      siteExists ? /* @__PURE__ */ jsxs("span", { children: [
        " / [",
        /* @__PURE__ */ jsx("a", { href: makePagesUrl(data.name), children: "view_web" }),
        "]"
      ] }) : null
    ] })
  ] });
}
const photos = UNSAFE_withComponentProps(function Photos() {
  return /* @__PURE__ */ jsx("div", {
    className: "crt",
    children: /* @__PURE__ */ jsx("div", {
      className: "buzz_wrapper",
      id: "main",
      children: /* @__PURE__ */ jsx(Glitch, {
        children: /* @__PURE__ */ jsxs("div", {
          id: "content",
          children: [/* @__PURE__ */ jsx(Header, {
            selectedIndex: 2
          }), /* @__PURE__ */ jsxs("main", {
            children: [/* @__PURE__ */ jsxs("p", {
              className: "header",
              children: ["+-------------------------+", /* @__PURE__ */ jsx("br", {}), "| ", /* @__PURE__ */ jsx("span", {
                className: "cyan",
                children: "MY_PHOTOS"
              }), " / hexhyperion |", /* @__PURE__ */ jsx("br", {}), "+-------------------------+"]
            }), /* @__PURE__ */ jsx("p", {
              children: " "
            }), /* @__PURE__ */ jsx("p", {
              children: "This section is WIP, will be active as soon as I figure out the best way to embed some gallery here :)"
            })]
          }), /* @__PURE__ */ jsx("footer", {
            children: /* @__PURE__ */ jsxs("p", {
              children: ["Homepage-inator Mark II", /* @__PURE__ */ jsx("br", {}), "© 2024-", (/* @__PURE__ */ new Date()).getFullYear(), " Szymon Urbaniak"]
            })
          })]
        })
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: photos
}, Symbol.toStringTag, { value: "Module" }));
const _index = UNSAFE_withComponentProps(function Home() {
  const getMyAge = () => {
    const birthDate = /* @__PURE__ */ new Date("2007-11-29");
    const today = /* @__PURE__ */ new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return age;
  };
  return /* @__PURE__ */ jsx("div", {
    className: "crt",
    children: /* @__PURE__ */ jsx("div", {
      className: "buzz_wrapper",
      id: "main",
      children: /* @__PURE__ */ jsx(Glitch, {
        children: /* @__PURE__ */ jsxs("div", {
          id: "content",
          children: [/* @__PURE__ */ jsx(Header, {
            selectedIndex: 0
          }), /* @__PURE__ */ jsxs("main", {
            children: [/* @__PURE__ */ jsxs("p", {
              className: "header",
              children: ["+------------------------+", /* @__PURE__ */ jsx("br", {}), "| ", /* @__PURE__ */ jsx("span", {
                className: "cyan",
                children: "SZYMON_U"
              }), " / hexhyperion |", /* @__PURE__ */ jsx("br", {}), "+------------------------+"]
            }), /* @__PURE__ */ jsx("p", {
              children: " "
            }), /* @__PURE__ */ jsx("p", {
              className: "header",
              children: "ABOUT ME"
            }), /* @__PURE__ */ jsx("p", {
              className: "header",
              children: "--------"
            }), /* @__PURE__ */ jsxs("p", {
              children: [/* @__PURE__ */ jsx("span", {
                title: "General Kenobi...",
                children: "Hello there!"
              }), " I'm a random ", getMyAge(), "-year-old guy from Poland fascinated with technology, automotive and computer science, who ended up programming things in school :P", /* @__PURE__ */ jsx("br", {}), "Mainly you'd see me working with various flavors and applications of JS/TS, but I touch some C++, C# and (God forbid) Python from time to time. We'll see in what years' time I'll sit down to learn Rust, Java and Kotlin as I planned...", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "After losing all my brain cells working with JavaScript, I sometimes happen to accidentally touch grass while running around with a camera, taking some (mildly) creative documentary and artistic photos, which you can find on my IG and Flickr below!", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "I also love myself some good ol' American cars, fast bikes, classic rock and swords, however weird this combination may seem... I'm a big Star Wars fan, too, swinging glowing sticks at things and spitting random quotes at every possible occasion :D", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "If you'd like to see my questionable art, either in text or pixels, use the menu at the top of the page!"]
            }), /* @__PURE__ */ jsx("p", {
              className: "header",
              children: " "
            }), /* @__PURE__ */ jsx("p", {
              className: "header",
              children: "MY SOCIALS"
            }), /* @__PURE__ */ jsx("p", {
              className: "header",
              children: "----------"
            }), /* @__PURE__ */ jsxs("p", {
              children: ["Facebook -> ", /* @__PURE__ */ jsx("a", {
                href: "https://www.facebook.com/urb.szymon",
                target: "_blank",
                children: "urb.szymon"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["Instagram -> ", /* @__PURE__ */ jsx("a", {
                href: "https://www.instagram.com/urb.szymon",
                target: "_blank",
                children: "urb.szymon"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["Flickr -> ", /* @__PURE__ */ jsx("a", {
                href: "https://www.flickr.com/photos/urbszymon",
                target: "_blank",
                children: "urb.szymon"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["GitHub -> ", /* @__PURE__ */ jsx("a", {
                href: "https://github.com/hexhyperion",
                target: "_blank",
                children: "hexhyperion"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["Discord -> ", /* @__PURE__ */ jsx("a", {
                href: "https://discordapp.com/users/764099018811768852",
                target: "_blank",
                children: "hexhyperion"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["LinkedIn -> ", /* @__PURE__ */ jsx("a", {
                href: "https://www.linkedin.com/in/szymon-urbaniak/",
                target: "_blank",
                children: "Szymon Urbaniak"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              children: ["Steam -> ", /* @__PURE__ */ jsx("a", {
                href: "https://steamcommunity.com/id/hexhyperion",
                target: "_blank",
                children: "hexhyperion"
              })]
            })]
          }), /* @__PURE__ */ jsx("footer", {
            children: /* @__PURE__ */ jsxs("p", {
              children: ["Homepage-inator Mark II", /* @__PURE__ */ jsx("br", {}), "© 2024-", (/* @__PURE__ */ new Date()).getFullYear(), " Szymon Urbaniak"]
            })
          })]
        })
      })
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index
}, Symbol.toStringTag, { value: "Module" }));
const repos = UNSAFE_withComponentProps(function Repos() {
  const [repos2, setRepos] = useState([]);
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
    } catch (error) {
      console.error("Failed to fetch repositories:", error);
    }
  };
  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    const cachedTime = localStorage.getItem(LOCAL_STORAGE_TIME_KEY);
    const now = Date.now();
    if (cached && cachedTime && now - parseInt(cachedTime) < 5 * 60 * 1e3) {
      try {
        setRepos(JSON.parse(cached));
      } catch {
        fetchRepos();
      }
    } else {
      fetchRepos();
    }
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "crt",
    children: /* @__PURE__ */ jsx("div", {
      className: "buzz_wrapper",
      id: "main",
      children: /* @__PURE__ */ jsx(Glitch, {
        children: /* @__PURE__ */ jsxs("div", {
          id: "content",
          children: [/* @__PURE__ */ jsx(Header, {
            selectedIndex: 1
          }), /* @__PURE__ */ jsxs("main", {
            children: [/* @__PURE__ */ jsxs("p", {
              className: "header",
              children: ["+---------------------------+", /* @__PURE__ */ jsx("br", {}), "| ", /* @__PURE__ */ jsx("span", {
                className: "cyan",
                children: "CS_PROJECTS"
              }), " / hexhyperion |", /* @__PURE__ */ jsx("br", {}), "+---------------------------+"]
            }), /* @__PURE__ */ jsx("p", {
              children: " "
            }), /* @__PURE__ */ jsx("p", {
              children: "Here you can see all my school and personal programming projects, automatically fetched from my GitHub using their REST API. Some of those are deployed on GH Pages as well, in those cases you can find a link to the web version next to the GH one."
            }), /* @__PURE__ */ jsx("p", {
              className: "header",
              children: " "
            }), /* @__PURE__ */ jsx("div", {
              className: "list",
              children: repos2 && repos2.length > 0 ? repos2.map((repo) => /* @__PURE__ */ jsx(ListItem, {
                data: repo
              }, repo.id)) : /* @__PURE__ */ jsx("p", {
                children: "No repositories found."
              })
            })]
          }), /* @__PURE__ */ jsx("footer", {
            children: /* @__PURE__ */ jsxs("p", {
              children: ["Homepage-inator Mark II", /* @__PURE__ */ jsx("br", {}), "© 2024-", (/* @__PURE__ */ new Date()).getFullYear(), " Szymon Urbaniak"]
            })
          })]
        })
      })
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: repos
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-iUu85MFR.js", "imports": ["/assets/chunk-C37GKA54-BMHwpGcR.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Cg6IapW9.js", "imports": ["/assets/chunk-C37GKA54-BMHwpGcR.js"], "css": ["/assets/root-BbAOXOxy.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/photos": { "id": "routes/photos", "parentId": "root", "path": "photos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/photos-D-lHZClt.js", "imports": ["/assets/chunk-C37GKA54-BMHwpGcR.js", "/assets/Header-2sait1ty.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-Dru8VCqj.js", "imports": ["/assets/chunk-C37GKA54-BMHwpGcR.js", "/assets/Header-2sait1ty.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/repos": { "id": "routes/repos", "parentId": "root", "path": "repos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/repos-BFrcOLT5.js", "imports": ["/assets/chunk-C37GKA54-BMHwpGcR.js", "/assets/Header-2sait1ty.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-6d81e0d4.js", "version": "6d81e0d4", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/photos": {
    id: "routes/photos",
    parentId: "root",
    path: "photos",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/repos": {
    id: "routes/repos",
    parentId: "root",
    path: "repos",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
