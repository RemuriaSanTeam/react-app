import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const element = <h1>RemuriaSanTeam</h1>;
const name = 'レムリア';
//変数の埋め込みができる
const aisatsu = <h1>どうも、{name}さん！</h1>

//{}の中でjsの式を埋め込むことが出来る
//const userName=<img src={name.avatarUrl} />;

//jsxのタグは子要素を持つことが出来る
/*
const children=(
  <div>
    <h3>サイコーでござる</h3>
    <p>これはたまらん</p>
  </div>
);
*/
ReactDOM.render(
  element,
  document.getElementById('root')
);
ReactDOM.render(
  aisatsu,
  document.getElementById('name')
);

function tick() {
  const sample = (
    <div>
      <h2>現在時刻</h2>
      <h2>{new Date().toLocaleTimeString()}です</h2>
    </div>
  );
  ReactDOM.render(sample, document.getElementById('sample'));
}
setInterval(tick, 1000);

//関数コンポーネントの定義(イニシャルの部分は大文字でないとダメ)
function Welcome(props) {
  return <h1>どうも{props.name}</h1>;
}
//コンポーネントの組み合わせ
function App() {
  return (
    <div>
      <Welcome name="めそ" />
      <Welcome name="ぽよ" />
      <Welcome name="ぴえん" />
    </div>
  );
}

//Welcome関数のレンダー
//App関数のレンダー
const come = <Welcome name="めそ" />;
ReactDOM.render(
  <App />,
  document.getElementById('function')
);

function formatDate(date) {
  return date.toLocaleDateString();
}

//コンポーネントの抽出
function Post(posts) {
  return (
    <div className="Comment">
      <UserInfo user={posts.author} />
      <div className="Comment-text">
        {posts.text}
      </div>
      <div className="Comment-date">
        {formatDate(posts.date)}
      </div>
    </div>
  );
}

//Postコンポーネントの分割
//Avaterを抽出(分割)
function Avater(posts) {
  return (
    <img className="Avater"
      src={posts.author.avaterUrl}
      alt={posts.author.name}
    />
  );
}
//UserInfoの抽出(分割)
function UserInfo(posts){
  return(
    <div className="UserInfo">
      <Avater user={posts.user} />
    <div className="UserInfo-name">
      {posts.author.name}
    </div>
  </div>
  );
}
const post = {
  date: new Date(),
  text: 'テストテキスト',
  author: {
    name: 'レムリア',
    avaterUrl: '../public/logo192.png',
  },
};

ReactDOM.render(
  <Post
    date={post.date}
    text={post.text}
    author={post.author}
  />,
  document.getElementById('post')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
