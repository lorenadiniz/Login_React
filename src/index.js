import ReactDOM from 'react-dom';
import React from 'react';

function UsuarioLogado(props) {
  return <h1>Olá usuário!</h1>;
}

function confirma() {

  let obj = { email: document.getElementById("usuario").value, password: document.getElementById("senha").value };
  // console.log(obj);
  return obj;
}
function UsuarioNaoLogado(props) {

  return (
    <div>
      <h1>Efetue Login</h1>
      <input type="text" id="usuario" placeholder="Informe o usuário" />
      <br />
      <input type="password" id="senha" placeholder="Informe a senha" />
    </div>

  );
}


function Saudacao(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UsuarioLogado />;
  }
  return <UsuarioNaoLogado />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    let dados = confirma();

    //let dados = { email: "alex@gmail.com", password: "123456" }
    dados = JSON.stringify(dados);
    console.log("dados " + dados);
    const url = 'https://projeto-integrador-4.herokuapp.com/auth/login';

    fetch(url,
      {
        method: "POST",
        body: dados,
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((res) => {

        if (res.token !== undefined) {
          console.log(res.token);
          this.setState({ isLoggedIn: true });
        } else { alert("Login não autorizado, verifique credenciais"); }

      });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        <Saudacao isLoggedIn={isLoggedIn} />


        <div>
          {isLoggedIn
            ? <LogoutButton onClick={() => this.handleLogoutClick()} />
            : <LoginButton onClick={() => this.handleLoginClick()} />
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);