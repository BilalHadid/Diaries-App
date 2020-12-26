import React, { FC } from "react";
import Diaries from "../../component/Diaries";
import Editor from "../../component/Editor";

const Home: FC = () => {
  return (
    <div className="two-cols">
      <div className="left">
        <Diaries />
      </div>
      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Home;