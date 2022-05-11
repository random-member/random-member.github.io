import "./App.css";
import * as React from "react";

export default function App() {
  const defaultMember = (msg) => ({
    1: [msg],
    2: [msg]
  });
  const defaultTeam = (msg) => ({
    1: [msg]
  });
  const [member, setMember] = React.useState(defaultMember("뽑아주세요"));
  const [teamSync, setTeamSync] = React.useState(defaultTeam("뽑아주세용.."));
  const [deploy, setDeploy] = React.useState("뽑아주세요우..!");
  const [title, setTitle] = React.useState("다음사람은 누구?");
  const [bang, setBang] = React.useState(false);

  const generateRetro = () => {
    const result = {
      1: [],
      2: []
    };
    let rest1 = [
      "gump",
      "winnie",
      "anthony",
      "hazle",
      "randy",
      "benny",
      "hunter",
      "nara"
    ];

    let index = 1;
    for (let i = 0; i < 8; i++) {
      const random = Math.floor(Math.random() * rest1.length);
      const picked = rest1[random];
      rest1 = rest1.filter((v) => v !== picked);
      if (result[index].length < 4) {
        result[index].push(picked);
      } else {
        result[++index].push(picked);
      }
    }
    return result;
  };

  const generateTempSync = () => {
    const result = {
      1: []
    };
    let rest2 = [
      "winnie",
      "anthony",
      "randy",
      "hunter",
      "hazle",
      "gump",
      "benny",

    ];
    let index = 1;
    for (let i = 0; i < 2; i++) {
      const random = Math.floor(Math.random() * rest2.length);
      const picked = rest2[random];
      rest2 = rest2.filter((v) => v !== picked);
      result[index].push(picked);
    }
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
    const random = Math.floor(Math.random() * member.length);
    return member[random];
  };

  const draw = () => {
    setMember(defaultMember("두구두구두구🙂🙃🥁🥁🥁🥁🥁🥁🥁"));
    setTeamSync(defaultTeam("두구두구..두구!!!"));
    setDeploy("두구두구두구두구두구🙀");
    setTitle("⭐️️️️️️🤩✨");
    setBang(false);

    setTimeout(() => {
      setMember(generateRetro());
      setTeamSync(generateTempSync());
      setDeploy(pickDeploy());
      setTitle("🎉🎉🎉 짜잔 ✨👏👏👏");
      setBang(true);
    }, 2000);
  };

  return (
      <div className="App">
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
            </div>
        )}
        <h1>{title}</h1>
        <button
            style={{
              width: "100px",
              height: "30px",
              fontSize: "20px",
              zIndex: 9999
            }}
            onClick={draw}
        >
          {bang ? "다시뽑기" : "뽑기"}
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
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>Team sync up</div>
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
  );
}
