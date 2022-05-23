import "./App.css";
import * as React from "react";
import pickRandom from "pick-random";
import _remove from "lodash/remove";

export default function App() {
  const defaultMember = (msg) => ({
    1: [msg],
    2: [msg],
  });
  const defaultTeam = (msg) => ({
    1: [msg],
  });
  const [member, setMember] = React.useState(defaultMember("뽑아주세요"));
  const [teamSync, setTeamSync] = React.useState(defaultTeam("뽑아주세용.."));
  const [deploy, setDeploy] = React.useState("뽑아주세요우..!");
  const [title, setTitle] = React.useState("다음사람은 누구?");
  const [bang, setBang] = React.useState(false);

  const [timeLeft, setTimeLeft] = React.useState(null);

  React.useEffect(() => {
    if (timeLeft === 0) {
      setMember(generateRetro());
      setTeamSync(generateTempSync());
      setDeploy(pickDeploy());
      setTitle("🎉🎉🎉🎉🎉🎉🎉🎉🎉✨ Congratulations! ✨👏👏👏👏👏👏👏👏👏");
      setBang(true);
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const generateRetro = () => {
    const result = {
      1: [],
      2: [],
    };
    let rest1 = [
      "gump",
      "winnie",
      "anthony",
      "hazle",
      "randy",
      "benny",
      "hunter",
      "nara",
    ];

    result["1"] = pickRandom(rest1, { count: 4 });
    result["2"] = _remove(rest1, (n) => !result["1"].includes(n));
    return result;
  };

  const generateTempSync = () => {
    const result = {
      1: [],
    };
    let rest2 = [
      "winnie",
      "anthony",
      "hazle",
      "gump",
      "benny",
      "nara"
    ];
    result["1"] = pickRandom(rest2, { count: 2 });
    return result;
  };

  const pickDeploy = () => {
    let member = [
      "hunter",
      "gump",
      "hazle",
      "randy",
      "anthony",
      "benny",
      "winnie",
    ];
    return pickRandom(member, { count: 1 });
  };

  const draw = () => {
    setMember(defaultMember("두구두구두구🙂🙃🥁🥁🥁🥁🥁🥁🥁"));
    setTeamSync(defaultTeam("두구두구..두구!!!"));
    setDeploy("두구두구두구두구두구🙀");
    setTitle(
      "⭐️️️️️️🤩✨⭐️️️️️️🤩✨두구두구두구두구두구⭐️️️️️️🤩✨⭐️️️️️️🤩✨"
    );
    setBang(false);
    setTimeLeft(3);
  };

  return (
    <>
      {timeLeft && (
        <div className="timer">
          <div className="number">{timeLeft}</div>}
        </div>
      )}
      <div className="App">
        <div className="fyi">
          ** Random 적용 패키지:{" "}
          <a
            href={"https://www.npmjs.com/package/pick-random"}
            target="_blank"
            rel="noreferrer noopener"
          >
            https://www.npmjs.com/package/pick-random
          </a>
        </div>
        {bang && (
          <div>
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
            <div className="confetti" />
          </div>
        )}
        <h1>{title}</h1>
        <button
          style={{
            width: "100px",
            height: "30px",
            fontSize: "20px",
            zIndex: 9999,
          }}
          onClick={draw}
        >
          {bang ? "다시뽑기" : timeLeft ? "뽑는중.." : "뽑기"}
        </button>
        <br />
        <br />
        <div style={{ fontWeight: "bold", fontSize: "30px" }}>회고</div>
        <br />
        <div>
          {Object.keys(member).map((key) => {
            return (
              <React.Fragment key={key}>
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  {key}조
                </div>
                <div>
                  {member[key].map((name) => (
                    <div
                      key={name}
                      style={{ textTransform: "capitalize", fontSize: "22px" }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <br />
              </React.Fragment>
            );
          })}
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>
            Team sync up
          </div>
          <div>
            {teamSync[1].map((name) => (
              <div
                key={name}
                style={{ textTransform: "capitalize", fontSize: "22px" }}
              >
                {name}
              </div>
            ))}
          </div>
          <br />
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>Deploy</div>
          <div>
            <div style={{ textTransform: "capitalize", fontSize: "22px" }}>
              {deploy}
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
