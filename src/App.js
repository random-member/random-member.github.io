import "./App.css";
import * as React from "react";
import pickRandom from "pick-random";
import _remove from "lodash/remove";
import Confetti from "./confetti";
import axios from "axios";

const closetMember = ["nara", "gump", "winnie", "anthony", "hazle", "benny"];
const connectMember = ["mari", "randy", "hunter"];
const TIME_ZONE = 3240 * 10000;

export default function App() {
  const defaultMember = (msg) => ({
    1: [msg],
    2: [msg],
    3: [msg],
  });
  const [member, setMember] = React.useState(defaultMember("뽑아주세요"));
  const [bang, setBang] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [closetDeploy, setClosetDeploy] = React.useState("");
  const [connectDeploy, setConnectDeploy] = React.useState("");
  const [closetUpdateDate, setClosetUpdateDate] = React.useState("");
  const [connectUpdateDate, setConnectUpdateDate] = React.useState("");
  const [isClosetUpdate, setIsClosetUpdate] = React.useState(false);
  const [isConnectUpdate, setIsConnectUpdate] = React.useState(false);

  React.useEffect(() => {
    if (timeLeft === 0) {
      setMember(generateRetro());
      setBang(true);
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  React.useEffect(() => {
    getClosetDeployMember();
    getConnectDeployMember();
  });

  const getConnectDeployMember = () => {
    axios
      .get("https://random-member.sssssungs.workers.dev/connect")
      .then(({ data }) => {
        const { name, date } = data;
        setConnectDeploy(name);
        setConnectUpdateDate(makeDashDate(date));
        setIsConnectUpdate(false);
      });
  };

  const getClosetDeployMember = () => {
    axios
      .get("https://random-member.sssssungs.workers.dev/closet")
      .then(({ data }) => {
        const { name, date } = data;
        setClosetDeploy(name);
        setClosetUpdateDate(makeDashDate(date));
        setIsClosetUpdate(false);
      });
  };

  const generateRetro = () => {
    let rest1 = [
      "gump",
      "winnie",
      "anthony",
      "hazle",
      "randy",
      "benny",
      "hunter",
      "nara",
      "mari",
    ];

    const result = {
      1: [],
      2: [],
      3: [],
    };

    result["1"] = pickRandom(rest1, { count: 3 });
    const filtered = _remove(rest1, (n) => !result["1"].includes(n));
    result["2"] = pickRandom(filtered, { count: 3 });
    result["3"] = _remove(filtered, (n) => !result["2"].includes(n));

    return result;
  };

  const draw = () => {
    setMember(defaultMember("🥁🥁🥁🥁🥁🥁"));
    setBang(false);
    setTimeLeft(3);
  };

  const onClickClosetNext = () => {
    const index = closetMember.indexOf(closetDeploy);
    const nextPerson = closetMember[index + 1] ?? closetMember[0];
    setIsClosetUpdate(true);
    patch(nextPerson, "closet");
  };

  const onClickConnectNext = () => {
    const index = connectMember.indexOf(connectDeploy);
    const nextPerson = connectMember[index + 1] ?? connectMember[0];
    setIsConnectUpdate(true);
    patch(nextPerson, "connect");
  };

  const patch = (name, type) => {
    axios
      .post("https://random-member.sssssungs.workers.dev/" + type, {
        name,
        date: Number(getCurrentDate().replace(/-/g, "")),
      })
      .then((_) => {
        if (type === "closet") {
          getClosetDeployMember();
        }

        if (type === "connect") {
          getConnectDeployMember();
        }
      });
  };

  const getCurrentDate = () =>
    new Date(+new Date() + TIME_ZONE).toISOString().split("T")[0];

  return (
    <>
      {timeLeft && (
        <div className="timer">
          <div className="number">{timeLeft}</div>
        </div>
      )}
      <div className="App">
        {bang && <Confetti />}
        <h1>CLO-SET & CONNECT Frontend Board</h1>
        <button
          style={{
            width: "150px",
            height: "30px",
            fontSize: "20px",
            zIndex: 9999,
          }}
          onClick={draw}
        >
          {bang ? "다시뽑기" : timeLeft ? "뽑는중.." : "회고조 뽑기"}
        </button>
        <br />
        <br />
        <div style={{ fontWeight: "bold", fontSize: "30px" }}>회고</div>
        <br />
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {Object.keys(member).map((key) => {
            return (
              <div key={key}>
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  {key}조
                </div>
                <div>
                  {member[key].map((name) => (
                    <div
                      key={name}
                      style={{
                        textTransform: "capitalize",
                        fontSize: "22px",
                        marginTop: "3px",
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <br />
              </div>
            );
          })}
        </div>
        <br />
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div>
            <h2>이번 CLO-SET 배포담당자</h2>
            {closetDeploy.length === 0 ? (
              <h2>로딩중..🕖</h2>
            ) : (
              <h2 style={{ textTransform: "capitalize" }}>
                ️😋 {closetDeploy} ⭐️
              </h2>
            )}
            <div style={{ color: "grey" }}>
              <h5>Update date: {closetUpdateDate}</h5>
            </div>
            <button
              style={{
                width: "120px",
                height: "30px",
                fontSize: "20px",
                zIndex: 9999,
              }}
              onClick={onClickClosetNext}
            >
              {isClosetUpdate ? "업데이트중.." : "다음사람"}
            </button>
          </div>
          <div>
            <h2>이번 CONNECT 배포담당자</h2>
            {connectDeploy.length === 0 ? (
              <h2>로딩중..🕖</h2>
            ) : (
              <h2 style={{ textTransform: "capitalize" }}>
                😜 {connectDeploy} ✨
              </h2>
            )}
            <div style={{ color: "grey" }}>
              <h5>Update date: {connectUpdateDate}</h5>
            </div>
            <button
              style={{
                width: "120px",
                height: "30px",
                fontSize: "20px",
                zIndex: 9999,
              }}
              onClick={onClickConnectNext}
            >
              {isConnectUpdate ? "업데이트중.." : "다음사람"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const makeDashDate = (d) => {
  const str = String(d);
  return `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`;
};
