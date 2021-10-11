import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const element = <h1>RemuriaSanTeam</h1>;
const name = 'レムリア';

/**
 *  変数の埋め込みができる
 */

const aisatsu = <h1>どうも、{name}さん！</h1>

/**
 *  {}の中でjsの式を埋め込むことが出来る
 */

//const userName=<img src={name.avatarUrl} />;

/**
 *  jsxのタグは子要素を持つことが出来る
 */

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

/**
 *  関数コンポーネントの定義(イニシャルの部分は大文字でないとダメ)
 */

function Welcome(props) {
  return <h1>どうも{props.name}</h1>;
}
/**
 *  コンポーネントの組み合わせ
 */
function App() {
  return (
    <div>
      <Welcome name="めそ" />
      <Welcome name="ぽよ" />
      <Welcome name="ぴえん" />
    </div>
  );
}
/**
 *  Welcome関数のレンダー
 */
//App関数のレンダー
//const come = <Welcome name="めそ" />;
ReactDOM.render(
  <App />,
  document.getElementById('function')
);

function formatDate(date) {
  return date.toLocaleDateString();
}
/**
 *  コンポーネントの抽出
 */
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
/**
 *  Postコンポーネントの分割
 */
//Avaterを抽出(分割)
function Avater(posts) {
  return (
    <img className="Avater"
      src={posts.user.avaterUrl}
      alt={posts.user.name}
    />
  );
}
//UserInfoの抽出(分割)
function UserInfo(posts) {
  return (
    <div className="UserInfo">
      <Avater user={posts.user} />
      <div className="UserInfo-name">
        {posts.user.name}
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

/**
 * Clock関数のカプセル化
 */
/*
function Clock(props){
  return(
    <div>
      <h1>カプセル化するよ♪</h1>
      <p>今は{props.date.toLocaleDateString()}です。</p>
    </div>
  );
}
*/


/**
 * 関数をクラスに変換する
 * 1.React.Component を継承する同名の ES6 クラスを作成する。
 * 2.render() と呼ばれる空のメソッドを 1 つ追加する。
 * 3.関数の中身を render() メソッドに移動する。
 * 4.render() 内の props を this.props に書き換える。
 * 5.空になった関数の宣言部分を削除する。
 */
class Clock extends React.Component {
  //stateの初期化を行うコンストラクタ
  constructor(props) {
    super(props);
    this.state = { date: new Date() }
  }
  //コンポーネントの設定
  componentDidMount(){
    //出力がDOMにレンダーされた後に設定される
    this.timerID=setInterval(
      ()=>this.tick(),
      1000
    );
  }
  //コンポーネントのクリア
  componentWillUnmount(){
    clearInterval(this.timerID)
  }
  //ローカルstateの更新をスケジュール
  tick(){
    this.setState({
      date:new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Clock関数をクラスに変換するよ🎵</h1>
        <p>今は{this.state.date.toLocaleTimeString()}だよ!</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('clock')
);

/**
 * stateは直接使用しない!
 * 代わりにsetState関数を使う
 * 直接代入が許されるのはコンストラクタにのみ
 */
this.setState({text:'ヤッホー'})

/**
 * stateを二つ使いたいなら引数を二つ用意する
 */
this.setState((state,props)=>({
  counter:state.counter+props.increment
}))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
