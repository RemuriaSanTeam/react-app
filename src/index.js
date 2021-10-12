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
  componentDidMount() {
    //出力がDOMにレンダーされた後に設定される
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  //コンポーネントのクリア
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  //ローカルstateの更新をスケジュール
  tick() {
    this.setState({
      date: new Date()
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
//this.setState({text:'ヤッホー'})

/**
 * stateを二つ使いたいなら引数を二つ用意する
 */
/*
this.setState((state,props)=>({
  counter:state.counter+props.increment
}))
*/
/**
 * イベント処理
 * 
 * イベント処理とReactの違い
 * ・ReactのイベントはcamelCaseで命名される
 * ・JSXではイベントハンドラとして関数を渡す
 * ・Reactはfalseを返しても動作を止めることが出来ない
 */


//Reactクラスは外見と中身同時に作れますよコンポーネントってこと？
class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isToggleOn: true }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}
ReactDOM.render(
  <Toggle />,//クラス召喚
  document.getElementById('toggle')
)

/**
 * バインドしたくないなら
 *  ・パブリッククラスフィールド構文
 *  ・アロー関数
 * を使えば問題なし
 */

/**
 * 
 * 条件付きレンダー
 * 
 */

function UserGreeting(props) {
  return <h1>おかえんなさい！</h1>;
}

function GuestGreeting(props) {
  return <h1>サインインしてね</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('signIn')
);

/**
 * 要素を作って条件に入れる
 */

class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    //ログインクリック
    this.handleLoginClick = this.handleLoginClick.bind(this)
    //ログアウトクリック
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    //初期状態(ログアウト)
    this.state = { isLoggedIn: false }
  }
  //ログイン関数
  handleLoginClick() {
    this.setState({ isLoggedIn: true })
  }
  //ログアウト関数
  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }
  //一連の処理
  render() {
    const isLoggedIn = this.state.isLoggedIn
    let button
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  )
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  )
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('login')
)

/**
 * 論理演算子による条件分岐
 */

//messages配列の中身が0ならばp要素の文は表示されない
function Mailbox(props) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>どうも🎵</h1>
      {unreadMessages.length > 0 &&
        <p>あんた{unreadMessages.length}件メール溜まってるよ！</p>
      }
    </div>
  )
}
const messages=['a','a','a','a']
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('mail')
)

/**
 * 
 *  リストとkey
 * 
 */
//普通の配列宣言
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

//配列コンポーネントのレンダー
const numbers_a = [1, 2, 3, 4, 5];
const listItems = numbers_a.map((number) =>
  <li>{number}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('list')
)

/**
 * リスト項目にはkey(固有の値)を与えるべき
 * indexなど並び順が変更される可能性のある変数は最終手段として使う。基本使わない
 * 
 * 理由:Reaactの不要な更新(処理)をなくすため
 */

function NumberList(props){
  const numbers_b=props.numbers_b
  const listItems=numbers_b.map((number)=>
  <li key={number.toString()}>
    {number}
  </li>
  )
  return(
    <ul>{listItems}</ul>
  )
}

const numbers_b=[1,3,5,7,9]
ReactDOM.render(
  <NumberList numbers_b={numbers_b} />,
  document.getElementById('list')
)

/**
 *   keyは兄弟要素の中で同じであればよい
 */
function Blog(props){
  const sidebar=(
    <ul>
      {props.posts.map((post)=>
      //同一のキーを使用している
      <li key={post.id}>
        {post.title}
      </li>
      )}
    </ul>
  )
  const content= props.posts.map((post)=>
  //同一のキーを使用している
  <div key={post.id}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
  </div>
  )
  return(
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts=[
  {id:1,title:'こんにちは！',content:'どうも✨'},
  {id:2,title:'こんばんは',content:'寝るわ'}
]
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('blog')
)

/***
 * 
 * フォーム
 * 
 */

class NameForm extends React.Component{
  constructor(props){
    super(props)
    this.state={value:''}
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleChange(event){
    this.setState({value:event.target.value})
  }
  handleSubmit(event){
    alert('やっほー'+this.state.value)
    event.preventDefault()
  }
  render(){
    return(
      <form></form>
    )
  }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
