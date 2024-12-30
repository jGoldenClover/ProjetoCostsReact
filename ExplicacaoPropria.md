# Para criar os valores dos projetos, eu defino um banco .json onde eu defino o que ele pode receber

## Para acessar esses valores, é necessário usar o fetch em uma porta, porta essa que eu defini como padrão (diferente da porta onde eu inicio o React) dentro de 
   _./package.json ---&gt; "scripts" {"beckend" : "json-server --watch db.json --port 5000",}_ Assim como, o comando **npm start** inicia o React na porta 3000, esse comando inicia o server na porta 5000


- _`Dentro de {db.json}`_ : Eu crio meu cliente que vai ser as configurações de cada projeto, é simples, primeiro eu crio a classificação de categoria e depois eu coloco os valores como opções no meu select dentro de _'./src/Components/form/Select.js'_

- _`Dentro de {src/Components/projects/ProjectForm}`_ : Para pegar essa informação e deixa-la dentro do select eu primeiro preciso acessa-la, então eu uso o método fetch, apartir de agora, eu vou usar algumas funções que nunca tinha visto e fazem parte do básico da manipulação de informações pelas API's -- 


   - Primeiro eu faço um fetch no site onde está rodando meu servidor -- **fetch("http://localhost:5000/categories",** -- agora, eu passo 2 parâmetros, o link para pegar essa informação e o que eu quero passar junto

   - Para isso eu faço o seguinte (logo após a vírgula) : 
  
         {
         method: "GET",
         headers: {
         "Content-type": "aplication/json",
         },
         })

   - Feito isso, agora eu passo algumas condições para serem feitas depois disso e um catch, para caso der erro :

         //Eu não crio a variável response, ele entende que -- como eu passo ela como parâmetro, ele deve adiciona-la como variável, é a mesma coisa com o .catch, qualquer valor que eu passe como parâmetro, se for mostrado será o erro que o código apresentou

         .then((response) => response.json())
         .then((data) => setCategories(data))
         .catch((error) => console.log(error) )

   - As informações serão passadas, mas o React não entende quando um elemento tem que ser resgatado para então gerar modificar um componente, e então ele executa esse fetch tentando mapear essa informações varias e varias vezes até que elas mudem e o código continue.
   
      Para corrigir isso basta usar o useEffect antes do fetch (exemplo de uso)

         useEffect ( () => {
         fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
            "Content-type": "aplication/json",
            },
         })
            .then((resp) => resp.json())
            .then((data) => (setCategories = data))
            .catch((error) => console.log(error));
      
         } , [])
    
      Aqui eu faço essa requisição somente 1 vez, e para definir o valor onde eu vou armazenar eu passo um array vazio, semelhante ao que eu faço no useState para definir que um grupo de elementos vai ser modificado/definido. Agora a informação que eu busco esta dentro deste array



- _`Dentro de {src/Components/Pages/NewProject}`_ : Eu vou usar outro hook do React, o -<span style='color:#ff0000;'> useHistory </span>- , atualmente chamado de <span style='color: #00ff00'> useNavigate </span> , ele basicamente permite que o programador faça redirects do usuário, por exemplo em um submit, que envia o método POST para o HTTP e então redireciona o usuário para outra página.

   _OBS: O useHistory não esta mais funcionando, basta substituir por useNavigate que o resultado será o mesmo_

      import { useNavigate } from "react-router-dom";

      const navigate = useNavigate();

      function createPost (project) {

        // iniciando os custos e os serviços

        project.costs = 0
        project.services = []

        fetch('http://localhost:5000/projects' , {
            method: 'POST' ,
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate("/projects", { message: "Projeto criado com sucesso!" });
        })
        .catch((err) => console.log(err))
         }

   Aqui é simples, eu crio uma função que vai atualizar o server, que atualmente tem 2 páginas (<span style='color:#09f'> categories </span> e <span style='color:#f0f'> projects </span>), a página <span style='color:#09f'> categories </span> eu já defini e deixei como opção no select. Agora a gente tem que adicionar os projetos na página <span style='color:#f0f'> projects </span>.

   Para isso, eu já inicio um projeto definindo o custo e os serviços dele, e então, eu preciso acessar o site para modificar ele, assim eu passo o fetch como método POST que vai atualizar a informação da página e então, eu defino que depois de mudar o resultado da página para formato json, eu devo redirecionar o usuário para os projetos dele **"navigate("/projects", { message: "Projeto criado com sucesso!" });"** 



   - _`Agora dentro de {src/Components/projects/ProjectForm}`_ : Assim como antes, eu havia definido as informações de <span style='color:#09f'> categories </span> como opções para o select, agora eu preciso definir o meu projeto para mudar as informações dentro dele. 
   
      Então, eu uso o useState para definir a variável projects, que vai receber todo o meu conteúdo do projeto e setProject --&gt; Como valor padrão eu passo a própria informação, para o caso de uma edição mais tarde, ou (||) um objeto vazio ({}) já que o meu projeto esta em formato json.

         const submit = (e) => {
            e.preventDefault();
            console.log(project)
            handleSubmit(project);
         };

         function handleChange(e) {
            setProject({ ...project, [e.target.name]: e.target.value });
            // console.log(project);
         }

         function handleCategory(e) {
            setProject({
               ...project, category: {
               id: e.target.value,
               name: e.target.options[e.target.selectedIndex].text,
            },
         });
         }

      Agora, eu crio 3 funções que tem as seguintes características :

      **submit** --&gt; ela serve basicamente como valor de _"handleSubmit"_, que é basicamente o que vai acontecer assim que eu clicar no botão do tipo submit, assim , quando o submit for feito, o que o programa deve executar é a função **submit**, e a função submit executa o handleSubimit(project) `dentro de {src/Components/Pages/NewProject}` , eu digo que o valor de handleSubmit é executar a função createPost, que é basicamente a atualização do site.

      Resumindo o **submit** --&gt; Assim que o evento do tipo submit ocorrer, eu vou entrar nessa função de atualizar a página, o que me resta agora, é definir os valores dos inputs dentro do nosso objeto (projects)

      **<span style='color: #f00'> OBS :</span>** Dentro do js, quando um objeto se inicia com "..." é para desestruturar e possibilitar a manipulação desse objeto, exemplo de uso:

         pessoa = {
            nome: "roberto",
            idade:19
         }

         endereco = {
            cidade:"Campinas",
            estado :"SP"
         }

         informacaoPessoa = (...pessoa , ...endereco)

         console.log(informacaoPessoa) --> isso retorna { nome: "roberto", idade: 19, cidade: "São Paulo", estado: "SP" }

      Também é possível adicionar novas informações, que é o que a gente realmente faz no projeto :

         pessoa = {
            nome: "roberto",
            idade:19
         }

         informacaoPessoa = ({...pessoa , hobbie:"Jogar Bola" , formacao : "Ensino Médio Incompleto"})

         console.log(informacaoPessoa) --> {nome:"roberto" , idade:19 , hobbie:"Jogar Bola" , formacao : "Ensino Médio Incompleto"}



      **handleChange** --&gt; Aqui a gente usa o setProject para mudar o valor do nosso objeto, primeiro passando as informações que já tem nele "...project" e depois passando o valor do nome respectivo ao input logo em seguida do valor digitado pelo usuário --&gt; "setProject({ ...project, [e.target.name]: e.target.value });" 

         [e.target.name] --> É respectivo ao nome do input('name'), neste caso é nomeProjeto e precoProjeto

         e.target.value --> É respectivo ao valor digitado pelo usuário no input

         Assim, no momento que a função handleChange for usada, já é redefinido o valor de projeto, para o valor anterior + o que a pessoa digitou, isso vale para os 2 input's

      **handleCategory** --&gt; A ideia é a mesma, só que agora, a gente tem que resgatar o valor do select, então eu passo que o novo valor de projetc é o projeto antigo (...project) + uma nova chave que eu crio chamada "category" que vai receber mais um objeto com o id e o nome da categoria :

      **id: e.target.value** --> Dentro do meu novo objeto, eu resgato o valor do id, que é respectivo ao que eu selecionei

      **name: e.target.options[e.target.selectedIndex].text** --> É o mesmo principio, entre as opções que eu ofereço no meu select, de acordo com o índice selecionado ele resgata o texto de dentro. Exemplo:

         Estrutura do select:

         <select id="meuSelect">
            <option value="1">Opção 1</option>
            <option value="2">Opção 2</option>
            <option value="3">Opção 3</option>
         </select>

         os valores(value) representa o índice, e o texto representa o que está escrito dentro, logo neste exemplo, se usarmos o mesmo princípio do código anterior fica assim:

         id: e.target.value,
         name: e.target.options[e.target.selectedIndex].text,

         se o item escolido, for o item de índice 2, o texto que aparecerá é "Opção 2"


- _`Dentro de {src/Components/Pages/NewProject}`_ : Quando eu faço o POST para atualizar a informação quando o usuario criar um novo projeto eu passo outro parâmetro junto com o redirecionamento da página :

      fetch("http://localhost:5000/projects", {
         method: "POST",
         headers: {
         "Content-Type": "application/json",
         },
         body: JSON.stringify(project),
      })
         .then((resp) => resp.json())
         .then((data) => {
            console.log(data);
            //redirect
            navigate("/projects", {state: { message: "Projeto criado com sucesso!" }});
         })
         .catch((error) => console.log(error));
   
   Aqui, além de redirecionar o usuario é possível resgatar o valor da variável de message usando o hook de useLocation do react-router-dom :

      const location = useLocation();

      let message = "";

      if (location.state) {
         message = location.state.message;
      }   

   Agora é possivel acessar a menssagem que for passada pelo programador, e quem sabe exibi-la ao usuário

- _`Dentro de {src/Components/Pages/Project}`_ :   Eu uso um hook do react-router-dom, o useParams para pegar os parâmetros que  eu passo no endereço do site, neste caso (/projects/:id) o id. Assim, o react entende que se eu definir uma variavel com mesmo nome do parâmetro, eu consigo pegar esse valor, exemplo:
  
      const { id } = useParams();

      useEffect(() => {
         fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "aplication/json",
            },
         })
            .then((resp) => resp.json())
            .then((data) => {
            setProject(data);
            })
            .catch((err) => console.log(err));
      }, [id]);
   
   Agora, eu não só tenho o valor do id, como eu consigo filtrar para pegar o projeto com mesmo id da página do projeto que eu acessei


      

         